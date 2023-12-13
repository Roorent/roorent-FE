import { Tabs } from 'antd';
import  { useState } from 'react'

const { TabPane } = Tabs;

function Products() {
  const [activeTab, setActiveTab] = useState('owner');
  
  const handleTabChange = (key : any) => {
    setActiveTab(key);
    };
  // return (
  //   <div className='w-full min-h-screen flex justify-center relative'>
  //     <div className='bg-yellow-400 absolute top-[100px] w-[200px]'>a</div>
  //     <div className='bg-red-400 w-1/2'>b</div>
  //     <div className='bg-blue-400 w-1/2'>c</div>
  //   </div>
  // )
  return (
    <div className="p-4">
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Pengguna" key="user">
          {/* Konten untuk peran "Pengguna" */}
          <div className="my-4">Isi formulir pendaftaran untuk pengguna.</div>
        </TabPane>
        <TabPane tab="Admin" key="admin">
          {/* Konten untuk peran "Admin" */}
          <div className="my-4">Isi formulir pendaftaran untuk admin.</div>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Products
