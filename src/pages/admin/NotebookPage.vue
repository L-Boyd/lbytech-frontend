<template>
  <div class="notebook-container">
    <div class="notebook-header">
      <h1 class="notebook-title">学习笔记</h1>
      <a-select
        v-model:value="selectedNote"
        style="width: 300px"
        placeholder="选择要查看的笔记"
      >
        <a-select-option
          v-for="note in markdownFiles"
          :key="note.value"
          :value="note.value"
        >
          {{ note.label }}
        </a-select-option>
      </a-select>
    </div>

    <div class="notebook-content">
      <div class="outline-sidebar" v-if="outline && outline.length > 0">
        <div class="outline-title">目录</div>
        <div class="outline-list">
          <div
            v-for="(item, index) in outline"
            :key="index"
            class="outline-item"
            :class="{
              'outline-item-hidden': isItemHidden(item, index),
              'outline-item-expanded': expandedItems[item.id],
            }"
            :style="{ paddingLeft: item.level * 16 + 'px' }"
            @click="handleOutlineItemClick(item, index)"
          >
            <span class="outline-item-content">
              <span v-if="hasChildren(item, index)" class="outline-item-toggle">
                {{ expandedItems[item.id] ? "▼" : "▶" }}
              </span>
              {{ item.text }}
            </span>
          </div>
        </div>
      </div>
      <div class="markdown-content" v-html="renderedContent"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { CrownOutlined } from "@ant-design/icons-vue";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (error) {
        console.warn("代码高亮失败:", error);
      }
    }
    return ""; // 使用默认的转义
  },
});

// 添加标题id
md.renderer.rules.heading_open = function (tokens, idx, options, env, slf) {
  const token = tokens[idx];
  const headingText = tokens[idx + 1].content;
  // 使用相同的ID生成逻辑
  const lineIndex = tokens[idx].map[0]; // 使用token的行号
  const id = `heading-${lineIndex}-${headingText
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")}`;
  token.attrSet("id", id);
  return slf.renderToken(tokens, idx, options);
};

const markdownFiles = [
  { value: "note1", label: "Java笔记", path: "/notes/JAVA.md" },
  { value: "note2", label: "MySQL笔记", path: "/notes/MySQL笔记.md" },
  { value: "note3", label: "Linux 学习笔记", path: "/notes/Linux.md" },
  { value: "note4", label: "redis 学习笔记", path: "/notes/redis.md" },
  { value: "note5", label: "算法笔记", path: "/notes/算法笔记.md" },
  { value: "note6", label: "C++笔记", path: "/notes/C++.md" },
];

const selectedNote = ref(markdownFiles[0].value);
const renderedContent = ref("");
const outline = ref<Array<{ id: string; text: string; level: number }>>([]);

// 添加展开状态管理
const expandedItems = ref<Record<string, boolean>>({});

// 生成大纲
const generateOutline = (content: string) => {
  const headings: Array<{ id: string; text: string; level: number }> = [];
  const lines = content.split("\n");

  lines.forEach((line, lineIndex) => {
    const headingMatch = line
      .trim()
      .match(/^(#{1,6})[ \t]*([^#\n]+?)[ \t]*#*[ \t]*$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      // 使用行号和文本组合生成唯一ID
      const id = `heading-${lineIndex}-${text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")}`;
      headings.push({ id, text, level });
    }
  });

  return headings;
};

// 判断是否有子标题
const hasChildren = (item: { level: number }, index: number) => {
  const nextItem = outline.value[index + 1];
  return nextItem && nextItem.level > item.level;
};

// 判断标题是否应该隐藏
const isItemHidden = (item: { level: number; id: string }, index: number) => {
  if (item.level === 1) return false;

  // 从当前标题开始，向上查找所有父标题
  let currentIndex = index;
  let currentLevel = item.level;

  while (currentIndex >= 0) {
    const prevItem = outline.value[currentIndex];
    if (prevItem.level < currentLevel) {
      // 找到了一个父标题
      if (!expandedItems.value[prevItem.id]) {
        // 如果父标题被收起，当前标题应该被隐藏
        return true;
      }
      // 更新当前层级，继续向上查找
      currentLevel = prevItem.level;
    }
    currentIndex--;
  }

  return false;
};

// 处理大纲项点击
const handleOutlineItemClick = (
  item: { id: string; level: number },
  index: number
) => {
  // 如果是可展开的标题，切换其展开状态
  if (hasChildren(item, index)) {
    // 使用Vue的响应式更新方式
    expandedItems.value = {
      ...expandedItems.value,
      [item.id]: !expandedItems.value[item.id],
    };
  }

  // 滚动到对应位置
  scrollToHeading(item.id);
};

// 滚动到指定标题
const scrollToHeading = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  } else {
    console.warn("找不到目标元素:", id);
  }
};

const loadMarkdown = async (path: string) => {
  try {
    console.log("正在加载文件:", path);
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();

    // 先生成大纲
    outline.value = generateOutline(text);
    console.log("生成的大纲:", outline.value);

    // 再渲染内容
    renderedContent.value = md.render(text);
  } catch (error) {
    console.error("加载markdown文件失败:", error);
    renderedContent.value =
      '<div class="error-message">加载笔记失败，请稍后重试</div>';
  }
};

// 在加载新文件时重置展开状态
watch(selectedNote, () => {
  expandedItems.value = {};
});

watch(selectedNote, (newValue) => {
  const selectedFile = markdownFiles.find((file) => file.value === newValue);
  if (selectedFile) {
    loadMarkdown(selectedFile.path);
  }
});

onMounted(() => {
  loadMarkdown(markdownFiles[0].path);
});
</script>

<style scoped>
.notebook-container {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.notebook-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.notebook-title {
  margin: 0;
  font-size: 24px;
  color: #1a1a1a;
  font-weight: 600;
}

.notebook-content {
  display: flex;
  gap: 24px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.outline-sidebar {
  width: 240px;
  padding: 16px;
  border-right: 1px solid #e8e8e8;
  background-color: #fafafa;
  height: calc(100vh - 200px);
  overflow-y: auto;
  position: sticky;
  top: 24px;
}

.outline-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #1a1a1a;
}

.outline-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.outline-item {
  font-size: 14px;
  color: #666;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
}

.outline-item-content {
  display: flex;
  align-items: center;
  gap: 4px;
}

.outline-item-toggle {
  font-size: 12px;
  color: #999;
  width: 16px;
  text-align: center;
}

.outline-item-hidden {
  display: none;
}

.outline-item:hover {
  background-color: #e6f7ff;
  color: #1890ff;
}

.outline-item-expanded > .outline-item-toggle {
  color: #1890ff;
}

.markdown-content {
  flex: 1;
  padding: 24px;
  line-height: 1.6;
  overflow-y: auto;
  height: calc(100vh - 200px);
}

.markdown-content :deep(h1) {
  font-size: 2em;
  margin-bottom: 0.5em;
  padding-bottom: 0.3em;
  border-bottom: 1px solid #eaecef;
}

.markdown-content :deep(h2) {
  font-size: 1.5em;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  padding-bottom: 0.3em;
  border-bottom: 1px solid #eaecef;
}

.markdown-content :deep(h3) {
  font-size: 1.25em;
  margin-top: 1.25em;
  margin-bottom: 0.5em;
}

.markdown-content :deep(p) {
  margin-bottom: 1em;
}

.markdown-content :deep(code) {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
}

.markdown-content :deep(pre) {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f6f8fa;
  border-radius: 3px;
}

.markdown-content :deep(pre code) {
  padding: 0;
  margin: 0;
  font-size: 100%;
  word-break: normal;
  white-space: pre;
  background: transparent;
  border: 0;
}

.markdown-content :deep(blockquote) {
  padding: 0 1em;
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
  margin: 0 0 1em 0;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  padding-left: 2em;
  margin-bottom: 1em;
}

.markdown-content :deep(table) {
  border-spacing: 0;
  border-collapse: collapse;
  margin-bottom: 1em;
  width: 100%;
}

.markdown-content :deep(table th),
.markdown-content :deep(table td) {
  padding: 6px 13px;
  border: 1px solid #dfe2e5;
}

.markdown-content :deep(table tr) {
  background-color: #fff;
  border-top: 1px solid #c6cbd1;
}

.markdown-content :deep(table tr:nth-child(2n)) {
  background-color: #f6f8fa;
}

.error-message {
  color: #ff4d4f;
  text-align: center;
  padding: 20px;
  font-size: 16px;
}

:deep(.ant-select) {
  border-radius: 6px;
}

:deep(.ant-select-selector) {
  border-radius: 6px !important;
  height: 40px !important;
  line-height: 40px !important;
}

:deep(.ant-select-selection-item) {
  line-height: 38px !important;
}
</style>
