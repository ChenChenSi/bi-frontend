<template>
  <div class="main-layout">
    <header class="header">
      <div class="logo">BI System</div>
      <div class="user-info">
        <span>Admin</span>
        <button @click="logout">退出</button>
      </div>
    </header>
    <div class="container">
      <aside class="sidebar">
        <nav>
          <router-link to="/">工作区</router-link>
        </nav>
      </aside>
      <main class="content">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainLayout',
  methods: {
    logout() {
      // TODO: Implement logout logic
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.main-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.header {
  height: 60px;
  background: #001529;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
.logo {
  font-size: 20px;
  font-weight: bold;
}
.user-info button {
  margin-left: 10px;
  background: none;
  border: 1px solid #fff;
  color: #fff;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
}
.container {
  flex: 1;
  display: flex;
  overflow: hidden;
}
.sidebar {
  width: 200px;
  background: #fff;
  border-right: 1px solid #e8e8e8;
  padding: 20px 0;
}
.sidebar nav a {
  display: block;
  padding: 10px 20px;
  color: #333;
  text-decoration: none;
}
.sidebar nav a.router-link-active {
  color: #1890ff;
  background: #e6f7ff;
  border-right: 3px solid #1890ff;
}
.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #f0f2f5;
}
</style>
