import './App.css';
import Homepage from './pages/Homepage/Homepage.js'
import Header from './components/Header/Header.js'
import CategoryArticles from './pages/CategoryArticle/CategoryArticles'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './pages/Auth/Auth'
import AddArticle from './pages/AddArticle/AddArticle'
import ArticleDetails from './pages/ArticleDetails/ArticleDetails'

function App() {

  const categories = ['Health', 'Food', 'Travel', 'Tech'];
  
  return (
    <BrowserRouter>
    <Header categories={categories} />
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/category/:categoryName' element={<CategoryArticles />}/>
      <Route path='/auth' element={<Auth />} />
      <Route path='/addarticle' element={<AddArticle categories={categories} />} />
      <Route path='/article/:articleId' element={<ArticleDetails />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
