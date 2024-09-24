import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './Admin/Admin';
import Login from './Admin/Login';
import Profile from './pages/Profile';
import CollectionDetail from './pages/CollectionDetail';
import NftDetails from './components/NftDetails';
import Hero from './pages/Hero';
import BuyNft from './pages/BuyNft';
import PageNotFound from './Admin/PageNotFound';
import Activity from './pages/Activity';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Hero />}></Route>
      <Route path='/profile' element={<Profile />} />
      <Route path='/activity' element={<Activity />} />
      <Route path='/collection/:collectionName' element={<CollectionDetail/>}/>
      <Route path='/Nft/:Nftname' element={<NftDetails/>}/>
      <Route path='/Nft/:Nftname/buy' element={<BuyNft/>}/>
      <Route path='/admin/login' element={<Login />} />
      <Route path='/admin/*' element={<Admin />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
