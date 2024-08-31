import React from 'react'
import Navbar from '../components/Landing Page Components/Navbar'
import Footer from '../components/Footer'
import YellowButton from '../components/button/YellowButton'
import { CiStar } from "react-icons/ci";
import { CiShare2 } from "react-icons/ci";

const BuyNft = () => {
    return (
        <div style={{ fontFamily: "QuickSand" }}>
            <div style={{ backgroundImage: `url('/Hero/smoke 1.png')`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center", }}>
                <Navbar />
                <div className='max-w-[1920px] mx-auto mt-8 sm:mt-0 w-full flex flex-col  items-center justify-center gap-4'>
                    <img src="/Hero/frame.svg" alt="" className='w-[20%]' />
                    <div className='h-[4px] w-[94%] rounded-lg border'></div>
                </div>
                <div className='max-w-[1920px] mx-auto mt-8 flex flex-col xl:hidden items-center justify-center'>
                    <div className=' w-[80%] flex text-white justify-between items-center'>
                        <div className='h-[2vh] w-[10%]'>
                            <CiStar className='h-full w-full object-cover' />
                        </div>
                        <div className='space-y-2 text-transparent bg-clip-text bg-gradient-to-r from-[#FBCEA0] via-[#FFF9F2] to-[#FBCEA0]'>
                            <h1 className='text-[50px] sm:text-[64px] font-[400] leading-[54px]' style={{ fontFamily: "CaslonAntique" }}>DOHH</h1>
                            <h2 className='text-[16px] font-[400] leading-[14px] text-center' style={{ fontFamily: "CaslonAntique" }}>GAE DEARG</h2>
                        </div>
                        <CiShare2 />
                    </div>
                    <div className=' flex items-center mt-16'>
                        <div>
                            <img
                                src="/Hero/up.png"
                                alt="Previous"
                                className={`hover:cursor-pointer -rotate-90`}
                            />
                        </div>
                        <div>
                            <div
                                className="h-full w-full shadow-lg rounded-lg"
                                style={{ boxShadow: '0px 0px 94px 36px #06B225' }}
                            >
                                <img
                                    src="/Hero/celtic-green.png"
                                    alt=""
                                    className="shadow-lg w-full h-full object-cover rounded-lg"
                                    style={{ boxShadow: '0px 0px 20.8px 5px #000000' }}

                                />
                            </div>
                            <div className='mt-8 ml-12 w-[195px] lg:w-[195px] p-2 border-[1px] border-[#FCD37B]'>
                                <YellowButton>Buy <span>Celtic</span> Collection</YellowButton>
                            </div>
                        </div>
                        <div>
                            <img
                                src="/Hero/down.png"
                                alt="Previous"
                                className={`hover:cursor-pointer -rotate-90`}
                            />
                        </div>
                    </div>
                    <h1 className=' w-[90%] mt-8 text-center text-[24px] font-[500] leading-[28px] text-transparent bg-clip-text bg-gradient-to-r from-[#FBCEA0] via-[#FFF9F2] to-[#FBCEA0]' style={{ fontFamily: "CaslonAntique" }}>Lorem ipsum dolor sit amet consectetur. Aliquam tortor rhoncus tristique facilisi imperdiet interdum elementum. Lectus posuere tempor sed purus enim tristique nulla. Adipiscing proin ut et pellentesque dui bibendum ut sapien. Laoreet risus feugiat sed viverra dolor cum lacinia duis volutpat.</h1>
                    <div className='mt-8 h-[4px] w-[80%] rounded-lg border'></div>
                    <div className='mt-8 w-[80%] flex flex-col space-y-2'>
                        <h1 className='text-[24px] font-[500] leading-[28px] text-[#FFFFFF]' style={{ fontFamily: "CaslonAntique" }}>Details</h1>
                        <div className='flex items-center justify-between text-[16px] font-[500] leading-[20px] text-[#FFFFFF]'>
                            <h1>Contact Address</h1>
                            <h1>0x2358...a68b</h1>
                        </div>
                        <div className='flex items-center justify-between text-[16px] font-[500] leading-[20px] text-[#FFFFFF]'>
                            <h1>Token</h1>
                            <h1>ID8050</h1>
                        </div>
                        <div className='flex items-center justify-between text-[16px] font-[500] leading-[20px] text-[#FFFFFF]'>
                            <h1>Token Standard</h1>
                            <h1>ERC-721</h1>
                        </div>
                        <div className='flex items-center justify-between text-[16px] font-[500] leading-[20px] text-[#FFFFFF]'>
                            <h1>Chain</h1>
                            <h1>ICP</h1>
                        </div>
                        <div className='flex items-center justify-between text-[16px] font-[500] leading-[20px] text-[#FFFFFF]'>
                            <h1>Last updated</h1>
                            <h1>7 Days ago</h1>
                        </div>
                    </div>
                    <div className='mt-8 h-[4px] w-[80%] rounded-lg border'></div>
                </div>
                <div className='max-w-[1920px] mx-auto hidden xl:flex xl:w-[100%] 2xl:w-[93%] 2xl:ml-[3%] flex items-center gap' style={{ backgroundImage: `url('/Hero/green BG.svg')`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center", }}>
                    <div className='hidden sm:flex'>
                        <img
                            src="/Hero/up.png"
                            alt="Previous"
                            className={`hover:cursor-pointer -rotate-90`}
                        />
                    </div>
                    <div className='hidden w-full sm:flex' >
                        <div className='mt-8 w-[50%] flex flex-col space-y-8 ml-[10%]' >
                            <div className=' w-full flex text-white justify-between'>
                                <div className='h-[2vh] w-[10%]'>
                                    <CiStar className='h-full w-full object-cover' />
                                </div>
                                <div className='space-y-2 text-transparent bg-clip-text bg-gradient-to-r from-[#FBCEA0] via-[#FFF9F2] to-[#FBCEA0]'>
                                    <h1 className='text-[64px] font-[400] leading-[54px]' style={{ fontFamily: "CaslonAntique" }}>DOHH</h1>
                                    <h2 className='text-[16px] font-[400] leading-[14px] text-center' style={{ fontFamily: "CaslonAntique" }}>GAE DEARG</h2>
                                </div>
                                <CiShare2 />
                            </div>
                            <h1 className='ml-[10%] w-[80%] text-center text-[24px] font-[500] leading-[28px] text-transparent bg-clip-text bg-gradient-to-r from-[#FBCEA0] via-[#FFF9F2] to-[#FBCEA0]' style={{ fontFamily: "CaslonAntique" }}>Lorem ipsum dolor sit amet consectetur. Aliquam tortor rhoncus tristique facilisi imperdiet interdum elementum. Lectus posuere tempor sed purus enim tristique nulla. Adipiscing proin ut et pellentesque dui bibendum ut sapien. Laoreet risus feugiat sed viverra dolor cum lacinia duis volutpat.</h1>
                            <div className='ml-[10%] w-[80%] flex flex-col space-y-2'>
                                <h1 className='text-[24px] font-[500] leading-[28px] text-[#FFFFFF]' style={{ fontFamily: "CaslonAntique" }}>Details</h1>
                                <div className='flex items-center justify-between text-[16px] font-[500] leading-[20px] text-[#FFFFFF]'>
                                    <h1>Contact Address</h1>
                                    <h1>0x2358...a68b</h1>
                                </div>
                                <div className='flex items-center justify-between text-[16px] font-[500] leading-[20px] text-[#FFFFFF]'>
                                    <h1>Token</h1>
                                    <h1>ID8050</h1>
                                </div>
                                <div className='flex items-center justify-between text-[16px] font-[500] leading-[20px] text-[#FFFFFF]'>
                                    <h1>Token Standard</h1>
                                    <h1>ERC-721</h1>
                                </div>
                                <div className='flex items-center justify-between text-[16px] font-[500] leading-[20px] text-[#FFFFFF]'>
                                    <h1>Chain</h1>
                                    <h1>ICP</h1>
                                </div>
                                <div className='flex items-center justify-between text-[16px] font-[500] leading-[20px] text-[#FFFFFF]'>
                                    <h1>Last updated</h1>
                                    <h1>7 Days ago</h1>
                                </div>
                            </div>
                            <div className='ml-[40%]  w-[190px] lg:w-[195px] p-2 border-[1px] border-[#FCD37B]'>
                                <YellowButton>Buy <span>Celtic</span> Collection</YellowButton>
                            </div>
                        </div>
                        <div>
                            <div
                                className="h-[60%] w-[80%] mt-[40%] ml-[50%] shadow-lg rounded-lg"
                                style={{ boxShadow: '0px 0px 94px 36px #06B225' }}
                            >
                                <img
                                    src="/Hero/celtic-green.png"
                                    alt=""
                                    className="shadow-lg w-full h-full object-cover rounded-lg"
                                    style={{ boxShadow: '0px 0px 20.8px 5px #000000' }}

                                />
                            </div>
                        </div>
                    </div>
                    <div className='sm:flex hidden'>
                        <img
                            src="/Hero/down.png"
                            alt="Previous"
                            className={`hover:cursor-pointer -rotate-90`}
                        />
                    </div>

                </div>
                <div className='relative max-w-[1920px] mx-auto mt-8 pb-8 w-[100%] flex flex-col md:flex-row items-center justify-center'>
                    <div className='flex items-center justify-center xl:hidden  w-[100%] xl:w-[130%] lg:pl-[3%]'>
                        <img src="/Hero/celtic_hero.png" alt="" />
                    </div>
                    <div className='hidden xl:flex w-[100%] xl:w-[130%] lg:pl-[3%]'>
                        <img src="/Hero/Mask group.png" alt="" />
                    </div>
                    <div className='flex flex-col items-center justify-center md:items-start w-[100%] text-transparent bg-clip-text bg-gradient-to-r from-[#FBCEA0] via-[#FFF9F2] to-[#FBCEA0] space-y-4'>
                        <h1 className='sm:ml-0 text-[64px] font-[400] leading-[54px] custom-text-border'>Celtic</h1>
                        <h2 className='text-center sm:text-start w-[90%] lg:w-[70%]'>Lorem ipsum dolor sit amet consectetur. Aliquam tortor rhoncus tristique facilisi imperdiet interdum elementum. Lectus posuere tempor sed purus enim tristique nulla. Adipiscing proin ut et pellentesque dui bibendum ut sapien. Laoreet risus feugiat sed viverra dolor cum lacinia duis volutpat.</h2>
                        <div className='sm:ml-0 w-[193px] lg:w-[195px] p-2 border-[1px] border-[#FCD37B]'>
                            <YellowButton>Buy <span>Celtic</span> Collection</YellowButton>
                        </div>
                    </div>
                    <div className='absolute top-0 left-8'>
                        <img src="/Hero/Vector.png" alt="" />
                    </div>
                    <div className='absolute top-0 right-8'>
                        <img src="/Hero/Vector (1).png" alt="" />
                    </div>
                    <div className='absolute bottom-8 left-8'>
                        <img src="/Hero/Vector (2).png" alt="" />
                    </div>
                    <div className='absolute bottom-8 right-8'>
                        <img src="/Hero/Vector (4).png" alt="" />
                    </div>
                </div>

            </div>

            <div style={{ fontFamily: "CaslonAntique", backgroundImage: `url('/Hero/footer 1.png')`, backgroundRepeat: "no-repeat" }} className='overflow-hidden relative bg-center bg-cover'>
                <Footer />
            </div>
        </div>
    )
}

export default BuyNft
