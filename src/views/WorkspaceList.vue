<template>
  <div class="workspace-list">
    <h2>工作区列表</h2>
    <div class="actions">
      <button class="primary-btn" @click="createWorkspace">新建工作区</button>
    </div>
    <div class="grid">
      <div v-for="ws in workspaces" :key="ws.id" class="card" @click="openWorkspace(ws.id)">
        <h3>{{ ws.name }}</h3>
        <p>{{ ws.description }}</p>
        <div class="meta">
          <span>成员: {{ ws.memberCount }}</span>
          <span>报表: {{ ws.reportCount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WorkspaceList',
  data() {
    return {
      workspaces: [
        { id: 1, name: '销售部工作区', description: '销售报表与数据分析', memberCount: 12, reportCount: 5 },
        { id: 2, name: '财务部工作区', description: '财务审计与预算报表', memberCount: 8, reportCount: 3 },
        { id: 3, name: '运营部工作区', description: '用户增长与留存分析', memberCount: 15, reportCount: 8 }
      ]
    };
  },
  methods: {
    createWorkspace() {
      // Mock creation
      const id = this.workspaces.length + 1;
      this.workspaces.push({
        id,
        name: `新工作区 ${id}`,
        description: '新创建的工作区',
        memberCount: 1,
        reportCount: 0
      });
    },
    openWorkspace(id) {
      this.$router.push({ name: 'ReportList', params: { id } });
    }
  }
}
</script>

<style scoped>
.workspace-list {
  padding: 20px;
}
.actions {
  margin-bottom: 20px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
.card {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.3s;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.15);
}
.card h3 {
  margin: 0 0 10px 0;
  color: #1890ff;
}
.card p {
  color: #666;
  margin-bottom: 20px;
  height: 40px;
  overflow: hidden;
}
.meta {
  display: flex;
  justify-content: space-between;
  color: #999;
  font-size: 14px;
}
.primary-btn {
  background: #1890ff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
.primary-btn:hover {
  background: #40a9ff;
}
</style>
