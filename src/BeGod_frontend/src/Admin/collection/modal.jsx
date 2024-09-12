import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import ImageUploader from "./ImageUploader";
import toast from "react-hot-toast";

const Modal = (props) => {
    const {getAddedNftDetails} = props;
    const [nftId, setNftId] = useState("23svsd223sv23");
    const [nftName, setNftName] = useState("Cat Painting");
    const [nftType, setNftType] = useState("Mythic");
    const [nftQuantity, setNftQuantity] = useState("400");
    const [nftPrice, setPrice] = useState("200");
    const [nftDescription, setNftDescription] = useState("Lorem ipsum dolor sit amet consectetur. Volutpat sociis lectus fermentum arcu ...");
    const [nftImage,setNftImage] = useState("");
    const {toggleModal} = props


    const onClickAddButton = (event) => {
        event.preventDefault();
        if(nftId && nftName && nftType && nftQuantity && nftPrice && nftDescription && nftImage ){
            const nftDetails = {
                nftId,
                nftName,
                nftType,
                nftQuantity,
                nftImage,
                nftPrice,
                nftDescription
            }
            console.log("nft details",nftDetails);
            getAddedNftDetails(nftDetails);
            toggleModal();
            toast.success("NFT Card Added");
        }else{
            toast.error("Enter All NFT Card Details")
        }
       
    
    }

    const captureUploadedNftImage = (img) => {
        setNftImage(img);
        console.log("img" , img);
    }

    return (
        <div className="add_new_nft_popup_bg_container">
            <div className="flex justify-end items-center">
                <button className="text-[#ffffff]" onClick={() => toggleModal()}>
                    <RxCross2 size={25} />
                </button>
            </div>
            <form>
                <div>
                    <label className="mt-2 w-[100%] h-[60px] md:h-[86px] text-[#FFFFFF] gap-2 md:gap-4 text-[14px] md:text-[18px] leading-[25px]">
                        NFT's ID
                        <input
                            value={nftId}
                            onChange={(e) => setNftId(e.target.value)}
                            type="text"
                            className="mt-1 pl-4 w-[100%] h-[30px] bg-[#29292C] rounded-md text-[16px]  text-[#8a8686] "
                        />
                    </label>
                </div>

                <div className="mt-1">
                    <label className="mt-4 w-[100%] h-[60px] md:h-[86px] text-[#FFFFFF] gap-2 md:gap-4 text-[14px] md:text-[18px] leading-[25px]">
                        NFT Name
                        <input
                            value={nftName}
                            onChange={(e) => setNftName(e.target.value)}
                            type="text"
                            className="mt-1 pl-4 w-[100%] h-[30px]  bg-[#29292C] rounded-md  text-[16px]  text-[#8a8686]"
                        />
                    </label>
                </div>

                <div className="mt-1 flex flex-col sm:flex-row sm:gap-4 md:flex-row md:gap-4 w-full h-[120px] md:h-[60px] mb-0">
                    <label className="w-full sm:w-1/2 flex flex-col text-[#FFFFFF] gap-2 md:gap-2 text-[14px] md:text-[18px] leading-[25px]">
                        Type:
                        <select className="p-1 rounded-md h-[30px] bg-[#29292C] text-[16px] text-[#8a8686]" value={nftType} onChange={(e) => setNftType(e.target.value)}>
                            <option value="NORMAL" className="text-[16px] text-[#8a8686]">Mythic</option>
                            <option value="TEST" className="text-[16px] text-[#8a8686]">Test Option</option>
                        </select>
                    </label>

                    <label className="w-full sm:w-1/2 flex flex-col text-[#FFFFFF] gap-2 md:gap-2 text-[14px] md:text-[18px] leading-[25px]">
                            Quantity:
                            <input
                                value={nftQuantity}
                                onChange={(e) => setNftQuantity(e.target.value)}
                                type="text"
                                className="pl-4 rounded-md h-[30px] bg-[#29292C] text-[16px] text-[#8a8686]"
                            />
                    </label>
            </div>


                <div className="mt-1">
                    <label className="w-[100%] h-[60px] md:h-[86px] text-[#FFFFFF] gap-2 md:gap-4 text-[14px] md:text-[18px] leading-[25px]">
                            Image
                            <ImageUploader captureUploadedNftImage={captureUploadedNftImage}/>
                    </label>
                </div>

                <div className="mt-1">
                    <label className="mt-[20px] w-[100%] h-[60px] md:h-[86px] text-[#FFFFFF] gap-2 md:gap-4 text-[14px] md:text-[20px] leading-[25px]">
                        Price
                        <input
                            value={nftPrice}
                            onChange={(e) => setPrice(e.target.value)}
                            type="text"
                            className="pl-4 w-[100%] h-[30px] bg-[#29292C] rounded-md text-[16px]  text-[#8a8686] "
                        />
                    </label>
                </div>

                <div className="mt-1">
                    <label className="w-[100%] text-[#FFFFFF] gap-2 md:gap-4 text-[14px] md:text-[20px] leading-[25px]">
                        NFT's Description
                        <textarea
                            value={nftDescription}
                            onChange={(e) => setNftDescription(e.target.value)}
                            type="textarea"
                            rows={3}
                            className="pl-2 w-[100%] h-[70px]  bg-[#29292C] rounded-md mt-1   text-[16px]  text-[#8a8686] "
                        ></textarea>
                    </label>
                </div>
        <div className="mt-1 md:mt-2 flex justify-center">
            <button type="submit" className="h-[30px] w-[100px] border-0 bg-[#FCD37B] text-[#000000] rounded-sm" onClick={onClickAddButton}>ADD</button>
        </div>
               
            </form>
        </div>
    );
};

export default Modal;
