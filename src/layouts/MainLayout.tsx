import React from 'react';
import { Layout } from 'antd';
import Header from '../components/Header';
import Footer from '../components/Footer';

const { Content } = Layout;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Content className="main-layout-content">
        <div className="main-layout-children">{children}</div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default MainLayout;
