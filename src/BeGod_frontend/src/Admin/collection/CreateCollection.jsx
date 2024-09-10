import React, { useState } from "react";
import { AddIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import DropzoneWithUrlInput from "../components/DropzoneWithUrlInput";
import { Switch } from "@chakra-ui/react";
import { idlFactory } from "../../../../declarations/BeGod_backend/BeGod_backend.did.js";
import { canisterId } from "../../../../declarations/BeGod_backend";
import { Actor, HttpAgent } from "@dfinity/agent";
import { useSelector } from "react-redux";
import Modal from "./modal.jsx";
import NftCardItem from "./NftCardItem.jsx";
import LogoImageUploader from "./LogoImageUploader.jsx";
import { GoPlus } from "react-icons/go";
import { BiPlus } from "react-icons/bi";
import BackButton from "./BackButton.jsx";
import YellowButton from "../../components/button/YellowButton.jsx";

const CreateCollection = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [limit, setLimit] = useState(0);
  const [logo, setLogo] = useState(null);
  const [nfts, setNfts] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [nftRows, setNftRows] = useState([{ id: "", description: "" }]); // Initial row
  const [modal, setModal] = useState(false);
  const [nftCardsList, setNftCardsList] = useState([]);

  const { user } = useSelector((state) => state.auth);
  const principal_id = `ztrxb-fiosz-cy6zv-ugwdw-tcmmm-hg5cy-fzfw2-wlcme-4kbky-sorey-2ae`;

  const toggleModal = () => setModal(!modal);

  const handleAddRow = () =>
    setNftRows([...nftRows, { id: "", description: "" }]);

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...nftRows];
    updatedRows[index][field] = value;
    setNftRows(updatedRows);
  };

  const handleLogoChange = (file) => setLogo(file);

  const createActor = () => {
    const agent = new HttpAgent();
    return Actor.createActor(idlFactory, { agent, canisterId });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const actor = createActor();
    try {
      const collectionResponse = await actor.add_collection_to_map(
        principal_id
      );
      console.log("Collection created successfully:", collectionResponse);
      for (const nft of nftRows) {
        const nftResponse = await actor.addNFT({
          id: nft.id,
          description: nft.description,
          collectionId: collectionResponse.collectionId,
        });
        console.log("NFT created successfully:", nftResponse);
      }
      navigate("/success");
    } catch (error) {
      console.error("Error creating collection or NFTs:", error);
    }
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const getAddedNftDetails = (nftDetails) => {
    setNftCardsList([...nftCardsList, nftDetails]);
  };

  const deleteNft = (nftId) => {
    const updatedNFtList = nftCardsList.filter(
      (eachNft) => eachNft.nftId !== nftId
    );
    setNftCardsList(updatedNFtList);
  };

  return (
    <div className="w-[90%] overflow-y-scroll pt-10 px-10 pb-8 h-screen no-scrollbar  no-scroll 2xl:ml-[7%] md:w-full lg:w-[90%] lg:pt-20">
      <div className="w-full">
        <BackButton />
        <div className="my-8">
          <h1 className="text-3xl text-white ">Create Collection</h1>
          <div className="flex flex-col md:flex-row gap-x-8 items-center  w-full  px-1 py-2 text-[#FFFFFF] justify-start rounded-md">
            <form
              onSubmit={handleFormSubmit}
              className="flex flex-col w-full gap-2 mt-4 space-y-4"
            >
              {/* Collection Name and Max Limit */}
              <div className="flex flex-col sm:flex-row sm:gap-4 md:flex-row md:gap-4 w-[100%]">
                <label className="w-full sm:w-1/2 h-16 md:h-[86px] flex flex-col text-[#FFFFFF] gap-2 md:gap-4 text-[14px] md:text-[20px] leading-[25px]">
                  Collection Name:
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="pl-4 rounded-md  md:h-[86px] bg-[#29292C]"
                  />
                </label>
                <label className="w-full sm:w-1/2 md:h-[86px] flex flex-col text-[#FFFFFF] gap-2 md:gap-4 text-[14px] md:text-[20px] leading-[25px]">
                  Max Limit:
                  <input
                    onChange={(e) => setLimit(e.target.value)}
                    type="text"
                    className="pl-4 rounded-md md:h-[86px] bg-[#29292C]"
                  />
                </label>
              </div>
              {/* Description */}
              <label className="mt-[20px] w-[100%] h-[60px] md:h-[86px] flex flex-col text-[#FFFFFF] gap-2 md:gap-4 text-[14px] md:text-[20px] leading-[25px]">
                Description:
                <input
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  className="pl-4 w-[100%] h-[60px] md:h-[47px] bg-[#29292C] rounded-md"
                />
              </label>
              {/* Logo */}
              <label className="mt-[20px] w-[100%] h-[100px] md:h-aut text-[#FFFFFF] gap-2 md:gap-4 text-[14px] md:text-[20px] leading-[25px]">
                Logo
                <LogoImageUploader />
              </label>
              {/* No. of NFTs */}
              <label className="mt-[20px] w-[100%] h-[60px] md:h-[86px] flex flex-col text-[#FFFFFF] gap-2 md:gap-4 text-[14px] md:text-[20px] leading-[25px]">
                No. of NFTs:
                <input
                  onChange={(e) => setNfts(e.target.value)}
                  type="text"
                  className="pl-4 w-[100%] h-[60px] md:h-[47px] bg-[#29292C] rounded-md"
                />
              </label>
              <label className="mt-[20px] w-[100%] h-[60px] md:h-[46px] flex flex-row text-[#FFFFFF] gap-2 md:gap-4 text-[14px] md:text-[20px] leading-[25px]">
                Featured:
                <Switch
                  id="isChecked"
                  onChange={() => setIsChecked(!isChecked)}
                  className="pt-1"
                />
              </label>
              {/* Add new NFT Section */}
              <div
                className={`${
                  nftCardsList.length > 0 && "flex justify-end items-center"
                }`}
              >
                <label className="mt-[20px] w-[100%]  md:h-[46px] text-[#FFFFFF] gap-2 md:gap-4 text-[14px] md:text-[20px] leading-[25px] mb-[0px]">
                  NFT Cards
                </label>
                <br />
                <div className="relative inline-block py-2 mt-2">
                  <button
                    className="add_new_button flex items-center justify-center px-6 py-2 bg-transperent text-white border border-[#d1b471] rounded-l-full rounded-r-none h-[40px] w-[180px] "
                    onClick={toggleModal}
                  >
                    Add New
                  </button>
                  <div className="absolute left-[-10px] top-1/2 transform -translate-y-1/2 bg-[#f0c96a] w-[40px] h-[40px] rounded-full flex items-center justify-center border-2 border-gray-900">
                    <span>
                      <BiPlus size={22} />{" "}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                {nftCardsList.map((eachNftItem) => (
                  <NftCardItem
                    nftDetails={eachNftItem}
                    key={eachNftItem.nftId}
                    deleteNft={deleteNft}
                  />
                ))}
              </div>
              {/* Form Buttons */}
              <div className="flex justify-start sm:justify-end md:justify-end gap-4 w-[100%] mt-[10px] pb-8 sm:mb-0">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="w-[30%] sm:w-[25%] md:w-[15%] h-[43px] text-[#FFFFFF] rounded-md border-[#FCD37B] border font-semibold"
                >
                  Cancel
                </button>
                <YellowButton>Create Collection</YellowButton>
              </div>
              {modal && (
                <div className="fixed top-0 bottom-0 left-0 right-0 w-screen h-screen">
                  <div className="w-screen h-screen top-0 left-0 right-0 bottom-0 fixed bg-[rgba(49,49,49,0.8)]">
                    <div className="flex items-center justify-center h-screen">
                      <Modal
                        toggleModal={toggleModal}
                        getAddedNftDetails={getAddedNftDetails}
                      />
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCollection;
