import { defineUserConfig } from 'vitepress-export-pdf'
import { sidebar } from './config.mts'

// 从 sidebar 配置提取链接，按阅读顺序排列
function extractRouteOrder(sidebar: any[]): string[] {
  const routes: string[] = []
  for (const item of sidebar) {
    if ('link' in item && item.link) {
      routes.push(item.link + '.html')
    }
    if ('items' in item && item.items) {
      for (const sub of item.items) {
        if ('link' in sub && sub.link) {
          routes.push(sub.link + '.html')
        }
      }
    }
  }
  return routes
}

// 封面页排在最前，其余按 sidebar 顺序
const routeOrder = ['/pdf-cover.html', ...extractRouteOrder(sidebar)]

export default defineUserConfig({
  outFile: 'effective-llm.pdf',
  pdfOutlines: true,
  routePatterns: ['**', '!**/404.html', '!/index.html'],
  sorter: (pageA: { path: string }, pageB: { path: string }) => {
    const indexA = routeOrder.indexOf(pageA.path)
    const indexB = routeOrder.indexOf(pageB.path)
    // 不在路由表中的页面排到末尾
    const a = indexA === -1 ? Infinity : indexA
    const b = indexB === -1 ? Infinity : indexB
    return a - b
  },
  pdfOptions: {
    format: 'A4',
    margin: {
      top: '20mm',
      bottom: '25mm',
      left: '15mm',
      right: '15mm',
    },
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: `
      <div style="font-size: 9px; text-align: center; width: 100%; color: #999;">
        <span class="pageNumber"></span> / <span class="totalPages"></span>
      </div>
    `,
  },
})
