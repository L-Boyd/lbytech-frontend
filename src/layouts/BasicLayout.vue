<template>
  <div id="basicLayout">
    <a-layout>
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>

      <a-layout-footer class="footer">
        <a href="https://beian.miit.gov.cn/" target="_blank">
          粤ICP备2025382516号</a
        >
        <br />
        <img src="/备案图标.png" style="width: 20px" />
        <a
          href="https://beian.mps.gov.cn/#/query/webSearch?code=44030002006266"
          rel="noreferrer"
          target="_blank"
          >粤公网安备44030002006266号</a
        >
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";

//测试代码
/*import { getCurrentUser } from "@/api/user";

getCurrentUser().then((res) => {
  console.log(res);
});*/
</script>

<style scoped>
#basicLayout .footer {
  background: #efefef;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
}

#basicLayout .content {
  padding: 20px;
  margin-bottom: 20px;
  background: linear-gradient(to right, #fefefe, #fff);
}

#basicLayout .header {
  background: white;
  margin-bottom: 16px;
  color: unset;
  padding-inline: 20px;
}
</style>
