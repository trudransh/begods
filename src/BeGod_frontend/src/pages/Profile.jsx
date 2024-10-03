import React, { useEffect, useState } from 'react';
import Navbar from '../components/Landing Page Components/Navbar';
import Footer from '../components/Footer';
import NftCard from '../components/NftCard';
import { Link } from 'react-router-dom';
import YellowButton from '../components/button/YellowButton';
import { useAuth } from '../utils/useAuthClient';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ImageUploader from '../Admin/collection/ImageUploader';
import { RxCross2 } from "react-icons/rx";
import { Principal } from "@dfinity/principal";
import { BiCategory } from "react-icons/bi";
import { IoCheckmarkOutline } from "react-icons/io5";
import toast from 'react-hot-toast';
import MoonLoader from "react-spinners/MoonLoader";

import { FaTelegram } from "react-icons/fa6";


const mycollection = [

];


const favorite = [

];


const purchased = [

  { img1: "/image/nft.png", name: "TANNGIOST", sold: "50", ICP: "0.56" },
  { img1: "/image/Component 25.png", name: "POSIDONE", sold: "50", ICP: "0.56" },

];





const Profile = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCardsLoading,setIsCardsLoading] = useState(true);
  const [noCards,updateNoCardsStatus] = useState(false);

  const [selectedList , updateSelectedList] = useState([]);
  const [notOwnedCardsList,updateNotOwnedCardsList] = useState([]);
  const [currentOption,updateCurrentOption] = useState("mycollection");

  const allCollectionsList = useSelector((state)=> state.info.collectionList);

  console.log("all collection list in profile",allCollectionsList)

  const [favIds,setFavIds] = useState(undefined);
  
  const { principal } = useAuth();

  const [isUserDetailsLoadging,updateUserDetailsLoading] = useState(true);

  const [isDisplayCollectionDropDown , updateDropDownStatus] = useState(false);
  const navigate = useNavigate(); 
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(()=>{
    if(!isAuthenticated){
      navigate('/')
     }else{
      console.log(principal,'principal')
     }
  },[isAuthenticated]);



  const [currentDropDownOption , updateDropDownOption] = useState(0);


  const onOptionChange = async(updatedOption) => {
    updateCurrentOption(updatedOption)
    if(updatedOption !== currentOption){
      updateNoCardsStatus(false);
      setIsCardsLoading(true)
      if(updatedOption === "mycollection"){
        await fetchCollections();
      }else if(updatedOption === "favorite"){
        await fetchFavoriteCards();
      }
    }

  } 

  const fetchFavoriteCards = async() => {
    const result = await backendActor?.getFavorites(principal)
    console.log("resssssssult" , result);
    if(result.ok?.length>0){

      const favItems = result.ok;

      const favCardslist = favItems.map((eachFavToken)=>{
       for(let i=0;i<selectedList.length;i++){
        if(selectedList[i].tokenId === eachFavToken){
          return selectedList[i];
        }
       }
      })

      console.log("favList",favCardslist)

      setIsCardsLoading(false);

      updateSelectedList(favCardslist);


    }else{
      
      updateNoCardsStatus(true);
      
    }
    
  }

 


  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? selectedList.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === selectedList.length - 1 ? 0 : prevIndex + 1));
  };

   
   
  //  console.log("is authenticated in profile section" , isAuthenticated);
 
  useEffect(() => {
    setCurrentIndex(0);

  },[selectedList])

const {t} = useTranslation();
const { backendActor } = useAuth({});

const [userDetails,updateUserDetails] = useState({})
const [userName,updateUserName] = useState("");
const [email,updateEmail] = useState("");
const [telegramUrl,updateTelegramUrl] = useState("");

const [isDisplayEditProfile,updateEditProfileStatus] = useState(false);
const [profileUpdateInProcess,setProfileUpdateInProcess] = useState(false);
const [displayProfileUpdateSuccess,updateDisplayProfileUpdateSuccess] = useState(false);
const onClickUpdateUserDetails = async() => {
    setProfileUpdateInProcess(true)
  
    let updatedName = userName === "" ? userDetails.name : userName;
    let updatedEmail = email === "" ? userDetails.email : email;
    let updatedTelegramUrl = telegramUrl === "" ? userDetails.telegramUrl : telegramUrl;
    
    
    console.log("updated user details",updatedName,updatedEmail,updatedTelegramUrl);

    const updateResult = await backendActor?.updateUserDetails(Principal.fromText(principal),updatedName,updatedEmail,updatedTelegramUrl,[]);
    updateUserDetails({name:updatedName,email:updatedEmail,telegramUrl:updatedTelegramUrl});
    toast.success("Updated Successfully!")
    setProfileUpdateInProcess(false);
    updateUserName("");
    updateEmail("");
    updateTelegramUrl("");
    updateEditProfileStatus(false);
    // updateDisplayProfileUpdateSuccess(true);
  //  console.log("updatedUserDetails result",updateResult);
}

useEffect(()=>{
  fetchUserDetails()
},[])

const fetchUserDetails= async () => {
     const fetchUserResults= await backendActor?.getUserDetails(Principal.fromText(principal));
      console.log("user details" , fetchUserResults)
     if(Array.isArray(fetchUserResults.ok)){
       const result = fetchUserResults.ok;
        
      const newDetails = {
        name : result[3],
        email : result[4],
        telegramUrl : result[5],
       }
       updateUserDetails((prev)=>({...prev,...newDetails}))
       updateUserDetailsLoading(false);
     }
    
}


  const checkIsFavourite = async(tokenId) => {
      const ids = await backendActor?.getFavorites(principal);
      // console.log("iddddddddds",ids);
      if(ids.ok?.length>0){
        console.log("inside if")
        for(let i=0;i<ids.ok.length;i++){
        console.log("fav token id",ids.ok[i]);
        if(ids.ok[i] == tokenId){
          return true;
        }
      }
      }
      
      return false;
  

  }
let index = 0;
  const fetchCollections = async () => {
    const myCollectionList = [];
    let   fetchNotOwnedNfts = [];
    console.log("all collection list ",allCollectionsList);
    if(allCollectionsList.length === 0){
      updateNoCardsStatus(true);
      return;
    }
    

    await Promise.all(
      allCollectionsList.map(async (eachCollection,index) => {
        const resultOfUserNftCollections = await getDetails(eachCollection.collectionId);
        if (typeof resultOfUserNftCollections.ok === typeof ([])) {
          const collectionDetails = resultOfUserNftCollections.ok;
          console.log("collection details", collectionDetails);

          for (let i = 0; i < collectionDetails.length; i++) {
            const eachItem = collectionDetails[i];
            const cardDetails = eachItem[1].nonfungible;
            const metadata = JSON.parse(cardDetails.metadata[0].json);
          
            console.log("each item of owned nft",eachItem);
            const isFav = await checkIsFavourite(eachItem[0]);
          
            const nftCard = {
              collectionId:eachCollection.collectionId,
              index,
              isOwned:true,
              tokenId: eachItem[0],
              cardName: cardDetails?.name,
              cardImageUrl: cardDetails?.thumbnail,
              cardSold: "",
              isFavourite: isFav,
            };
          
            console.log("nft card", nftCard);
            myCollectionList.push(nftCard); 
          }
    
            const listedNfts = await backendActor?.listings(eachCollection.collectionId);
            if(listedNfts.length !== 0){
              const collectionNotOwendcards = getCollectionNfts(listedNfts,eachCollection.collectionId,index);
              fetchNotOwnedNfts = [...fetchNotOwnedNfts, ...collectionNotOwendcards];
              console.log("fetched nfts of a collection",fetchNotOwnedNfts)
            }
            
        
      
        }
      })
    );

    fetchNotOwnedNfts.forEach(element => {
        myCollectionList.push(element);
    });
    console.log("myCollectionList", myCollectionList);
    setIsCardsLoading(false);

    if (myCollectionList.length === 0) {
      updateNoCardsStatus(true);
    } else {
      updateSelectedList(myCollectionList);
     
    }
};
const getCollectionNfts = (collectionList,collectionId,collectionIndex) => {
  return collectionList.map((eachItem) => {
  //    console.log("list item",eachItem)
      index = index+1;
      const nftDetails = eachItem[3].nonfungible;
      const image = nftDetails.thumbnail;
      const name = nftDetails.name;
      const sold = eachItem[2].price;
      const ICP = parseInt(sold)/100000000;
      const metadata = JSON.parse(nftDetails.metadata[0].json);
      // console.log(metadata,'metadata');
      const nftType = metadata.nfttype;
      const borderColor = metadata.nftcolor;
      return {
          isOwned:false,
          collectionId,
          index:collectionIndex,
          cardIndex : eachItem[0],
          cardImageUrl: image,
          cardName :name,
          sold,
          ICP,
          nftType,
          borderColor
      };
  });
};

  const getDetails =  async(collectionId) => {
    console.log(collectionId,principal)
    const collectionDetailsResult = await backendActor.userNFTcollection(collectionId,principal)
    //  console.log("collection details in getDetails",collectionDetailsResult);
    return collectionDetailsResult

  }
   

   useEffect(()=>{
      fetchCollections()
   },[])


  //  console.log("selected List",selectedList);

const removeFromFavorites = async(tokenId) => {
  const removeFavResult = await backendActor?.removeFromFavorites(principal,tokenId);
  console.log("remove fav result",removeFavResult);
  toast.success(removeFavResult.ok);
  if(currentOption === "favorite"){
    fetchFavoriteCards();
  }else{
    const modifiedSelectedList = selectedList.map((eachItem)=>{
      if(eachItem.tokenId === tokenId){
        return {
          ...eachItem,
          isFavourite:false,
         }
      }
      return eachItem;
     })
     updateSelectedList(modifiedSelectedList)

  }
}

const addToFavorites = async(tokenId)=>{
  const result = await backendActor?.addToFavorites(principal,tokenId);
            console.log("add to fav result",result.ok);
            if(result.ok){
                // fetchCollections();
                
                const modifiedSelectedList = selectedList.map((eachItem)=>{
                  if(eachItem.tokenId === tokenId){
                    return {
                      ...eachItem,
                      isFavourite:true,
                     }
                  }
                  return eachItem;
                 })
                 updateSelectedList(modifiedSelectedList)
                 toast.success(result.ok)

            }else{
                toast.error(result.err.Other)
            }

            
    
}

  // const updatedList = selectedList.map((eachCard)=>{
  //     if()
  // })
  // console.log("selected list before return", selectedList)
  // console.log("not owned nfts" , notOwnedCardsList)

  // console.log("user details",userDetails)

  const filteredList = selectedList.filter((eachItem)=>{
      console.log("eachItem",eachItem);
      console.log("each item index",eachItem.index, " ",currentDropDownOption);
      if(eachItem.index == currentDropDownOption){
        return true;
      }
      return false;
  })

  
 
  return (
    <div className='font-caslon'>
      <div style={{ backgroundImage: `url('/Hero/smoke 1.png')`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center", }}>
        <Navbar />
        <div className='max-w-[1920px] mx-auto pl-[3%] mt-[5%] sm:mt-[3%] flex flex-col lg:flex-row'>
          <div className='w-full lg:w-[30%]'>
            <h1 className='text-center lg:text-start text-[#FFFFFF] text-[32px] sm:text-[48px] leading-[60px] font-[400]'>{t('myProfile')}</h1>
            
              {!isUserDetailsLoadging && (
                <div className='flex gap-8 mt-[5%] lg:mt-[2%] ml-[2%]'>
                <div className='flex flex-col items-center'>
                  <img src="/image/Frame.png" alt="" />
                  <div className='mt-5'>
                  <a href={userDetails.telegramUrl} target="_blank"><FaTelegram size={25} color='#24A1DE' /></a>
  
                      
                  </div>
                </div>
                <div>       
                    <div className='flex items-center'>
                      <div>
                      <h1 className='text-[20px] sm:text-[32px] font-[400] text-[#FFFFFF] leading-[40px]'>
                       {userDetails.name}
                          </h1>
                            <h1 className='text-[13px] sm:text-[16px] font-[400] text-[#FFFFFF] leading-[40px]'>{userDetails.email}</h1>
                        </div>
                      </div>
                <h2 className='ext-[20px] sm:text-[22px] font-[400] text-[#FFFFFF] leading-[25px]'>Wallet ID: 581918156</h2>
                <h2 className='ext-[20px] sm:text-[22px] font-[400] text-[#FFFFFF] leading-[25px]'>Balance: 200 ICP</h2>
                <button
            onClick={()=>updateEditProfileStatus(true)}
            className=' flex items-center justify-center mt-4  h-[30px] sm:w-[100px] sm:h-[28px] bg-blue-400 text-black border-3px border-gray-100 shadow-lg transform transition-transform hover:scale-105 font-caslon rounded-sm'>Edit Profile
            </button>
              </div>
              </div>
              )}
            
            
          </div>

          <div className='w-full lg:w-[70%]'>
            <div className='flex items-center justify-center gap-[10%] mt-8 lg:mt-0'>
              <div
                className={`text-[25px] sm:text-[32px] font-[400] text-[#FFFFFF] leading-[40px] cursor-pointer ${currentOption === "mycollection" ? 'border-b-4 border-[#FFD700]' : ''}`}
                onClick={() => onOptionChange("mycollection")}
              >
                {t('myCollection')}
              </div>
              <div
                className={`text-[25px] sm:text-[32px] font-[400] text-[#FFFFFF] leading-[40px] cursor-pointer ${currentOption === "favorite" ? 'border-b-4 border-[#FFD700]' : ''}`}
                onClick={() => onOptionChange("favorite")}
              >
                {t('favorite')}
              </div>
              {/* <div
                className={`text-[25px] sm:text-[32px] font-[400] text-[#FFFFFF] leading-[40px] cursor-pointer ${category === "favorite" ? 'border-b-4 border-[#FFD700] pb-2' : ''}`}
              >
                My Achievements
              </div> */}
            </div>
            {allCollectionsList.length >0 && (
              <div className="relative w-[180px] flex justify-center mr-5 z-10 mt-5 ">
                           
              <button
                  onClick={()=>updateDropDownStatus(!isDisplayCollectionDropDown)}
                  className={`rounded-full flex justify-center items-center gap-1 
                  w-full h-full p-2 bg-[#000] text-[#FCD378]  hover:border-[#FCD378] border-2 border-gray-800`}
              >
                  <BiCategory />
                  {allCollectionsList[currentDropDownOption].name}
              </button>
              {isDisplayCollectionDropDown && (
                      <ul className="absolute top-10 left-0 mt-2 bg-black text-[#FCD378] rounded shadow-lg  p-0 list-none  w-full max-h-[160px] overflow-y-auto ">
                          {allCollectionsList.map((eachCollection,index)=>(
                              <>
                                  <div key={eachCollection.index} className='flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-purple-900'
                                  onClick={()=>{if(eachCollection.index != currentDropDownOption){updateDropDownOption(index);updateDropDownStatus(!isDisplayCollectionDropDown)}}}>
                                      <li key={eachCollection.index}>{eachCollection.name}</li>
                                      {currentDropDownOption === eachCollection.index && (
                                      <IoCheckmarkOutline />
                                      )}
                                  </div>
                                  {index != allCollectionsList.length-1 && ( <hr className="m-0 border-t border-[#FCD378]" />)}
                              </>
                          ))}
                      </ul>
                  )}
                  
          </div>
            ) }
            {/* Small screen view for single image display with prev and next buttons */}
            <div className='z-0 flex items-center justify-between mt-8 sm:hidden'>
              
              <button onClick={handlePrev}>
                <img src="/Hero/up.png" alt="Previous" className='w-10 h-10 -rotate-90' />
              </button>
              {isCardsLoading?(
                  <SkeletonTheme baseColor="#161616" highlightColor="#202020">
                  <div className='mb-8'>
                      <Skeleton count={1} width={250} height={350} />
                  </div>
              </SkeletonTheme>
                  
                ):(
                  noCards ? (
                    <h1 className='text-[#FFD700] text-[22px] my-20'>No Cards Availalbe</h1>
                  ):(
                    filteredList.length>0 ? (
                      <div>
                      <NftCard img={filteredList[currentIndex]} key={currentIndex} removeFromFavorites={removeFromFavorites} addToFavorites = {addToFavorites}/>
                    </div>
                    ):(
                      <h1 className='text-[#FFD700] text-[22px] my-20'>No Cards Availalbe</h1>
                    )
                  )
                  
                )}
              
              <button onClick={handleNext}>
                <img src="/Hero/down.png" alt="Next" className='w-10 h-10 -rotate-90' />
              </button>
            </div>
          
            {/* Grid view for larger screens */}
            {noCards ? (
                <div className='hidden w-[90%] h-[65vh] sm:flex justify-center items-center '>
                  <h1 className='text-[#FFD700] text-[40px]'>No Cards Available</h1>
                </div>
            ):(
              
               (isCardsLoading ? (
                        <div className="pb-10">
                        <SkeletonTheme baseColor="#161616" highlightColor="#202020">
                          <div className="hidden md:grid justify-around md:grid-cols-3 xl:grid-cols-4  gap-5 m-5">
                            {Array.from({ length: 10 }).map((_, index) => (
                              <Skeleton
                                key={index}
                                count={1}
                                width={210}
                                height={300}
                              />
                            ))}
                          </div>
                        </SkeletonTheme>
                        </div>
                    ):(
                      <>
                     
                    {filteredList.length === 0 ? (
                      <div className='hidden w-[90%] h-[65vh] sm:flex justify-center items-center '>
                      <h1 className='text-[#FFD700] text-[40px]'>No Cards Available</h1>
                    </div>
                    ):(
                      <div className='hidden w-[90%] min-h-[65vh] sm:grid sm:grid-cols-3 2xl:grid-cols-4 gap-24 lg:gap-4 mt-8 sm:mx-10 mb-8'>
                      {filteredList.length > 0 && filteredList.map((img, index) => (
                        <div className='w-full  rounded-lg flip-card'>
                          <NftCard img={img} key={index} removeFromFavorites={removeFromFavorites} addToFavorites = {addToFavorites} />
                        </div>
                      ))}
                    </div>
                    )}
                    </>
                    ))
              
              
           
            )}
          </div>
        </div>
      </div>

      <div style={{backgroundImage: `url('/Hero/footer 1.png')`, backgroundRepeat: "no-repeat" }} className='relative overflow-hidden bg-center bg-cover'>
        <Footer />
      </div>
      {isDisplayEditProfile && (
        <div className="fixed top-0 bottom-0 left-0 right-0 w-screen h-screenn z-20">
        <div className="w-screen h-screen top-0 bottom-0 right-0 left-0 fixed bg-[rgba(49,49,49,0.8)]">
          <div className="flex items-center justify-center h-screen">
            <div
              className="h-[50vh] md:h-[40vh] w-[70vw] lg:w-[30vw] bg-[#111] text-white font-caslon p-5 rounded-md overflow-y-auto drop-shadow-lg "
            >
              <div className="relative flex items-center justify-end">
                <button
                  className="text-[#ffffff] absolute bottom-1 top-1 z-10"
                  onClick={() => updateEditProfileStatus(false)}
                >
                  <RxCross2 size={20} />
                </button>
              </div>
              {!displayProfileUpdateSuccess ? (
                <div>
                  <div className='mt-10 mb-5'>
                <div className='flex flex-col mb-1'>
                  <label>Name</label>
                  <input onChange={(e)=>updateUserName(e.target.value)} type='text' placeholder='Enter your name' className='pl-2 bg-transparent border border-white h-[30px] text-[13px] rounded-sm ' value={userName}/>
                </div>
                <div className='flex flex-col'>
                  <label>Email</label>
                  <input onChange={(e)=>updateEmail(e.target.value)} type='email' placeholder='Enter your email' className='pl-2 bg-transparent border border-white h-[30px] text-[13px] rounded-sm' value={email} />
                </div>
                <div className='flex flex-col'>
                  <label>Telegram</label>
                  <input onChange={(e)=>updateTelegramUrl(e.target.value)} type='text' placeholder='Enter your telegram link' className='pl-2 bg-transparent border border-white h-[30px] text-[13px] rounded-sm' value={telegramUrl} />
                </div>
              </div>
              <div className='flex justify-center items-center'>
                <button className={`w-20 border-none bg-[#FCD378] text-black h-6 mr-3 rounded-full `}  
                >Cancel</button>
                {profileUpdateInProcess ? (
                  <div className='flex justify-center items-center w-20 border-none bg-[#FCD378] text-black h-6 rounded-full'>
                  <MoonLoader
                  color="#000000"
                  size={20}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
                </div>
                ):(
                  <button className={`w-20 border-none bg-[#FCD378] text-black h-6 rounded-full `}
                onClick={()=>onClickUpdateUserDetails()}
                >Update</button>
                )}
              </div>
                </div>
              ):(
                <div>
                  <h1>Profile updated successfully!</h1>
                  <button onClick={updateEditProfileStatus(false)}>Close</button>
                </div>
              )}
          </div> 
        </div>
    </div>
  </div>
      )}
    </div>
  );
};

export default Profile;
