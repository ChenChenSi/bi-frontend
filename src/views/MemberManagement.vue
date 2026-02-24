<template>
  <div class="member-management">
    <div class="breadcrumb">
      <router-link to="/">工作区</router-link> / 
      <router-link :to="{ name: 'ReportList', params: { id: workspaceId }}">报表列表</router-link> / 
      成员管理
    </div>
    
    <div class="header">
      <h2>{{ workspaceName }} - 成员管理</h2>
      <button class="primary-btn" @click="inviteMember">邀请成员</button>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>用户名</th>
            <th>角色</th>
            <th>加入时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="member in members" :key="member.id">
            <td>{{ member.name }}</td>
            <td>
              <select v-model="member.role" @change="updateRole(member)">
                <option value="admin">管理员</option>
                <option value="editor">编辑者</option>
                <option value="viewer">访客</option>
              </select>
            </td>
            <td>{{ member.joinedAt }}</td>
            <td class="actions">
              <button class="danger" @click="removeMember(member.id)">移除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemberManagement',
  data() {
    return {
      workspaceId: this.$route.params.id,
      workspaceName: '加载中...',
      members: [
        { id: 1, name: 'Admin', role: 'admin', joinedAt: '2023-01-01' },
        { id: 2, name: '张三', role: 'editor', joinedAt: '2023-05-12' },
        { id: 3, name: '李四', role: 'viewer', joinedAt: '2023-06-20' },
      ]
    };
  },
  created() {
    // Mock fetching workspace info
    this.workspaceName = `工作区 ${this.workspaceId}`;
  },
  methods: {
    inviteMember() {
      const name = prompt('请输入新成员用户名:');
      if (name) {
        this.members.push({
          id: Date.now(),
          name,
          role: 'viewer',
          joinedAt: new Date().toISOString().split('T')[0]
        });
        alert('邀请发送成功！');
      }
    },
    updateRole(member) {
      console.log(`Updated ${member.name}'s role to ${member.role}`);
      // In real app, call API here
    },
    removeMember(id) {
      if (confirm('确定要移除该成员吗？')) {
        this.members = this.members.filter(m => m.id !== id);
      }
    }
  }
}
</script>

<style scoped>
.member-management {
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
select {
  padding: 4px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
}
.actions button.danger {
  color: #ff4d4f;
  border: 1px solid #ff4d4f;
  background: none;
  padding: 4px 12px;
  border-radius: 4px;
  cursor: pointer;
}
.actions button.danger:hover {
  background: #fff1f0;
}
.primary-btn {
  background: #1890ff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
