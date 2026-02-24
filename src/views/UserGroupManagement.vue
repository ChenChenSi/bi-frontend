<template>
  <div class="user-group-management">
    <div class="breadcrumb">
      <router-link to="/">工作区</router-link> / 
      <router-link :to="{ name: 'ReportList', params: { id: workspaceId }}">报表列表</router-link> / 
      用户组管理
    </div>

    <div class="header">
      <h2>{{ workspaceName }} - 用户组管理</h2>
      <button class="primary-btn" @click="createGroup">新建用户组</button>
    </div>

    <div class="grid">
      <div v-for="group in groups" :key="group.id" class="card">
        <div class="card-header">
          <h3>{{ group.name }}</h3>
          <button class="danger-btn" @click="deleteGroup(group.id)">删除</button>
        </div>
        <p class="description">{{ group.description }}</p>
        <div class="members">
          <h4>成员 ({{ group.members.length }})</h4>
          <ul>
            <li v-for="member in group.members" :key="member.id">
              {{ member.name }}
              <span class="remove-icon" @click="removeMember(group, member.id)">×</span>
            </li>
            <li class="add-member" @click="addMember(group)">+ 添加成员</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 新建用户组弹窗 -->
    <div v-if="showCreateModal" class="modal-overlay">
      <div class="modal">
        <h3>新建用户组</h3>
        <div class="form-group">
          <label>用户组名称</label>
          <input v-model="newGroup.name" placeholder="例如：销售部" />
        </div>
        <div class="form-group">
          <label>描述</label>
          <input v-model="newGroup.description" placeholder="可选" />
        </div>
        <div class="modal-actions">
          <button class="secondary-btn" @click="showCreateModal = false">取消</button>
          <button class="primary-btn" @click="confirmCreate">创建</button>
        </div>
      </div>
    </div>

    <!-- 添加成员弹窗 -->
    <div v-if="showAddMemberModal" class="modal-overlay">
      <div class="modal">
        <h3>添加成员到 {{ activeGroup?.name }}</h3>
        <div class="form-group">
          <label>选择成员</label>
          <select v-model="selectedMemberId">
            <option value="">请选择...</option>
            <option v-for="user in availableUsers" :key="user.id" :value="user.id">
              {{ user.name }}
            </option>
          </select>
        </div>
        <div class="modal-actions">
          <button class="secondary-btn" @click="showAddMemberModal = false">取消</button>
          <button class="primary-btn" @click="confirmAddMember">添加</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'UserGroupManagement',
  data() {
    return {
      workspaceId: this.$route.params.id,
      workspaceName: '加载中...',
      groups: [
        { 
          id: 1, 
          name: '销售一组', 
          description: '负责华东区域销售',
          members: [
            { id: 2, name: '张三' },
            { id: 4, name: '王五' }
          ]
        },
        { 
          id: 2, 
          name: '财务审核组', 
          description: '负责报表审核',
          members: [
            { id: 3, name: '李四' }
          ]
        }
      ],
      // Mock all workspace members
      allWorkspaceMembers: [
        { id: 1, name: 'Admin' },
        { id: 2, name: '张三' },
        { id: 3, name: '李四' },
        { id: 4, name: '王五' },
        { id: 5, name: '赵六' }
      ],
      showCreateModal: false,
      newGroup: { name: '', description: '' },
      showAddMemberModal: false,
      activeGroup: null,
      selectedMemberId: ''
    };
  },
  computed: {
    availableUsers() {
      if (!this.activeGroup) return [];
      const currentMemberIds = this.activeGroup.members.map(m => m.id);
      return this.allWorkspaceMembers.filter(u => !currentMemberIds.includes(u.id));
    }
  },
  created() {
    this.workspaceName = `工作区 ${this.workspaceId}`;
  },
  methods: {
    createGroup() {
      this.newGroup = { name: '', description: '' };
      this.showCreateModal = true;
    },
    confirmCreate() {
      if (!this.newGroup.name) {
        alert('请输入用户组名称');
        return;
      }
      this.groups.push({
        id: Date.now(),
        name: this.newGroup.name,
        description: this.newGroup.description,
        members: []
      });
      this.showCreateModal = false;
    },
    deleteGroup(id) {
      if (confirm('确定要删除该用户组吗？')) {
        this.groups = this.groups.filter(g => g.id !== id);
      }
    },
    addMember(group) {
      this.activeGroup = group;
      this.selectedMemberId = '';
      this.showAddMemberModal = true;
    },
    confirmAddMember() {
      if (!this.selectedMemberId) return;
      const user = this.allWorkspaceMembers.find(u => u.id === this.selectedMemberId);
      if (user) {
        this.activeGroup.members.push({ ...user });
      }
      this.showAddMemberModal = false;
    },
    removeMember(group, memberId) {
      group.members = group.members.filter(m => m.id !== memberId);
    }
  }
}
</script>

<style scoped>
.user-group-management {
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
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.card h3 {
  margin: 0;
  color: #333;
}
.description {
  color: #666;
  font-size: 14px;
  margin-bottom: 15px;
  height: 40px;
}
.members h4 {
  font-size: 14px;
  margin-bottom: 8px;
  color: #333;
}
.members ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.members li {
  background: #f5f5f5;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  display: flex;
  align-items: center;
}
.remove-icon {
  margin-left: 6px;
  cursor: pointer;
  color: #999;
}
.remove-icon:hover {
  color: #ff4d4f;
}
.add-member {
  background: #fff !important;
  border: 1px dashed #d9d9d9;
  cursor: pointer;
  color: #1890ff;
}
.add-member:hover {
  border-color: #1890ff;
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
.secondary-btn {
  background: #fff;
  color: #666;
  border: 1px solid #d9d9d9;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
.danger-btn {
  color: #ff4d4f;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
}
.danger-btn:hover {
  text-decoration: underline;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.modal h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
}
.form-group {
  margin-bottom: 16px;
}
.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}
.form-group input, .form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  box-sizing: border-box;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}
</style>
