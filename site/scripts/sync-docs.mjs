#!/usr/bin/env node

/**
 * 一键同步 effective-llm.md → VitePress 多页面
 *
 * 用法: node scripts/sync-docs.mjs
 *
 * 从项目根目录的 effective-llm.md 读取内容，
 * 按 Chapter / 附录 拆分为独立 markdown 文件写入 docs/ 目录。
 * 每次更新 effective-llm.md 后运行此脚本即可刷新站点内容。
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// ── 路径配置 ──────────────────────────────────────────────
const ROOT = resolve(__dirname, '../..')
const DOCS = resolve(__dirname, '../docs')
const SRC = resolve(ROOT, 'effective-llm.md')

// ── 章节拆分规则 ──────────────────────────────────────────
// pattern 中的 \b 确保精确匹配（避免 Chapter 1 匹配到 Chapter 10）
// file 以 __stash_ 开头的是 Part 开头段落，会合并到同 part 第一个 Chapter
const SECTION_RULES = [
  // 前言
  { pattern: /^## 前言$/, file: 'preface.md' },

  // Part I
  { pattern: /^## Part I\b/, file: '__stash_part1__' },
  { pattern: /^## Chapter 1\b/, file: 'part1/chapter1.md', prepend: '__stash_part1__' },
  { pattern: /^## Chapter 2\b/, file: 'part1/chapter2.md' },

  // Part II
  { pattern: /^## Part II\b/, file: '__stash_part2__' },
  { pattern: /^## Chapter 3\b/, file: 'part2/chapter3.md', prepend: '__stash_part2__' },
  { pattern: /^## Chapter 4\b/, file: 'part2/chapter4.md' },
  { pattern: /^## Chapter 5\b/, file: 'part2/chapter5.md' },
  { pattern: /^## Chapter 6\b/, file: 'part2/chapter6.md' },
  { pattern: /^## Chapter 7\b/, file: 'part2/chapter7.md' },

  // Part III
  { pattern: /^## Part III\b/, file: '__stash_part3__' },
  { pattern: /^## Chapter 8\b/, file: 'part3/chapter8.md', prepend: '__stash_part3__' },
  { pattern: /^## Chapter 9\b/, file: 'part3/chapter9.md' },
  { pattern: /^## Chapter 10\b/, file: 'part3/chapter10.md' },
  { pattern: /^## Chapter 11\b/, file: 'part3/chapter11.md' },
  { pattern: /^## Chapter 12\b/, file: 'part3/chapter12.md' },
  { pattern: /^## Chapter 13\b/, file: 'part3/chapter13.md' },
  { pattern: /^## Chapter 14\b/, file: 'part3/chapter14.md' },

  // Part IV
  { pattern: /^## Part IV\b/, file: '__stash_part4__' },
  { pattern: /^## Chapter 15\b/, file: 'part4/chapter15.md', prepend: '__stash_part4__' },
  { pattern: /^## Chapter 16\b/, file: 'part4/chapter16.md' },

  // Part V
  { pattern: /^## Part V\b/, file: '__stash_part5__' },
  { pattern: /^## Chapter 17\b/, file: 'part5/chapter17.md', prepend: '__stash_part5__' },
  { pattern: /^## Chapter 18\b/, file: 'part5/chapter18.md' },

  // 附录
  { pattern: /^## 附录 A/, file: 'appendix/a.md' },
  { pattern: /^## 附录 B/, file: 'appendix/b.md' },
  { pattern: /^## 附录 C/, file: 'appendix/c.md' },
]

// ── 主流程 ────────────────────────────────────────────────
function main() {
  if (!existsSync(SRC)) {
    console.error(`❌ 找不到源文件: ${SRC}`)
    process.exit(1)
  }

  const raw = readFileSync(SRC, 'utf-8')
  const lines = raw.split('\n')

  // 1. 找到所有 ## 标题行及其行号
  const h2Indices = []
  for (let i = 0; i < lines.length; i++) {
    if (/^## /.test(lines[i])) {
      h2Indices.push(i)
    }
  }

  // 2. 按规则匹配，收集 (startLine, endLine, rule) 三元组
  const matched = []
  for (let hi = 0; hi < h2Indices.length; hi++) {
    const startLine = h2Indices[hi]
    const endLine = hi + 1 < h2Indices.length ? h2Indices[hi + 1] : lines.length
    const heading = lines[startLine]

    const rule = SECTION_RULES.find(r => r.pattern.test(heading))
    if (rule) {
      matched.push({ startLine, endLine, rule, heading })
    } else {
      console.log(`  ⏭ 跳过无规则标题: ${heading}`)
    }
  }

  // 3. 提取各段内容，暂存 Part 开头
  const stashes = {}
  const outputs = {}

  for (const m of matched) {
    const { startLine, endLine, rule, heading } = m
    // 取内容时跳过标题行本身和紧随的 ---
    let contentStart = startLine + 1
    if (contentStart < endLine && lines[contentStart].trim() === '---') {
      contentStart++
    }

    const content = lines.slice(contentStart, endLine).join('\n').trim()

    if (rule.file.startsWith('__stash_')) {
      stashes[rule.file] = content
    } else {
      let finalContent = content
      // 如果有 prepend，把暂存的 Part 开头段落加到前面
      if (rule.prepend && stashes[rule.prepend]) {
        finalContent = stashes[rule.prepend] + '\n\n---\n\n' + finalContent
        delete stashes[rule.prepend]
      }
      outputs[rule.file] = { heading, content: finalContent }
    }
  }

  // 4. 写文件
  let written = 0
  for (const [relPath, data] of Object.entries(outputs)) {
    const absPath = resolve(DOCS, relPath)
    const dir = dirname(absPath)
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true })

    // 把原来的 ## 标题降级为 # (页面标题)
    const pageContent = `# ${data.heading.replace(/^## /, '')}\n\n${data.content}`

    writeFileSync(absPath, pageContent + '\n', 'utf-8')
    written++
    console.log(`  ✏️  ${relPath}`)
  }

  console.log(`\n✅ 同步完成：共写入 ${written} 个页面文件`)
}

main()
