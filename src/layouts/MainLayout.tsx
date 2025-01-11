import React from 'react';
import { Layout } from 'antd';
import Header from '../components/Header';
import Footer from '../components/Footer';

const { Content } = Layout;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <div style={{ padding: 24 }}>{children}</div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default MainLayout;
