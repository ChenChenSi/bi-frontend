<template>
  <div class="report-list">
    <div class="breadcrumb">
      <router-link to="/">工作区</router-link> / 报表列表
    </div>
    <div class="header">
      <h2>{{ workspaceName }} - 报表列表</h2>
      <div class="btn-group">
        <button class="secondary-btn" @click="manageMembers">成员管理</button>
        <button class="primary-btn" @click="createReport">新建报表</button>
      </div>
    </div>
    
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>报表名称</th>
            <th>创建者</th>
            <th>更新时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="report in reports" :key="report.id">
            <td>{{ report.name }}</td>
            <td>{{ report.creator }}</td>
            <td>{{ report.updatedAt }}</td>
            <td class="actions">
              <button @click="viewReport(report.id)">查看</button>
              <button @click="editReport(report.id)">编辑</button>
              <button class="danger" @click="deleteReport(report.id)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="reports.length === 0" class="empty">
        暂无报表，请点击右上角新建
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReportList',
  data() {
    return {
      workspaceId: this.$route.params.id,
      workspaceName: '加载中...',
      reports: [
        { id: 1, name: '2023年度销售总结', creator: '张三', updatedAt: '2023-12-01' },
        { id: 2, name: 'Q4 财务报表', creator: '李四', updatedAt: '2023-11-20' },
      ]
    };
  },
  created() {
    // Mock fetching workspace info
    this.workspaceName = `工作区 ${this.workspaceId}`;
  },
  methods: {
    manageMembers() {
      this.$router.push({ name: 'MemberManagement', params: { id: this.workspaceId } });
    },
    createReport() {
      this.$router.push({ name: 'ReportDesigner' });
    },
    viewReport(id) {
      this.$router.push({ name: 'ReportViewer', params: { id } });
    },
    editReport(id) {
      this.$router.push({ name: 'ReportDesigner', params: { id } });
    },
    deleteReport(id) {
      if (confirm('确定要删除该报表吗？')) {
        this.reports = this.reports.filter(r => r.id !== id);
      }
    }
  }
}
</script>

<style scoped>
.report-list {
  padding: 20px;
}
.breadcrumb {
  margin-bottom: 20px;
  color: #666;
}
.breadcrumb a {
  color: #1890ff;
  text-decoration: none;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.table-container {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
}
th {
  background: #fafafa;
  font-weight: 600;
}
.actions button {
  margin-right: 8px;
  padding: 4px 8px;
  cursor: pointer;
  background: none;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}
.actions button:hover {
  color: #1890ff;
  border-color: #1890ff;
}
.actions button.danger:hover {
  color: #ff4d4f;
  border-color: #ff4d4f;
}
.primary-btn {
  background: #1890ff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
.secondary-btn {
  background: #fff;
  color: #1890ff;
  border: 1px solid #1890ff;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}
.empty {
  text-align: center;
  padding: 40px;
  color: #999;
}
</style>
