import { ArrowBackIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { collection } from "../../TextData";
import { useLocation, useParams } from "react-router-dom";
import YellowButton from "../../components/button/YellowButton";
import BackButton from "./BackButton";
import NftCard from "./NftCard.jsx";
import { Principal } from "@dfinity/principal";
import { useAuth } from "../../utils/useAuthClient.jsx";
import Modal from "./modal.jsx";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";

function CollectionDetails() {
  const [nftList, setnftList] = useState([]);
  const [modal, setModal] = useState(false);
  const [nfttype, setnfttype] = useState("rare");
  const [nftname, setnftname] = useState("");
  const [nftquantity, setnftquantity] = useState();
  const [nftprice, setnftprice] = useState();
  const [nftimage, setnftimage] = useState("");
  const [nftdescription, setnftdescription] = useState("");
  const [nftcolor, setnftcolor] = useState("");
  const [loading, setLoading] = useState(false);
  const { backendActor, canisterId } = useAuth();
  const { id } = useParams();
  const location = useLocation();
  const { collectiondata } = location.state || {};
  console.log(nftprice);
  console.log(nftquantity);

  const toggleModal = () => {
    setModal(!modal);
  };
  console.log(collectiondata);
  if (!collectiondata) {
    return <p>No NFT data available</p>;
  }

  console.log(collectiondata?.[1].toString());

  // // getAllCollectionNFTs
  const principal = collectiondata?.[1];
  const userPrincipalArrayy = principal;
  const principalStringg = Principal.fromUint8Array(
    userPrincipalArrayy._arr
  ).toText();
  console.log(principalStringg);

  const getAllCollectionNFT = async (principal) => {
    try {
      const userPrincipalArray = principal;

      const principalString = Principal.fromUint8Array(userPrincipalArray._arr);

      const result = await backendActor?.getAllCollectionNFTs(principalString);
      console.log("NFT collection:", result);
      setnftList(result);
    } catch (error) {
      console.error("Error fetching get all collection NFT:", error);
    }
  };

  useEffect(() => {
    const fetchNFTs = async () => {
      setLoading(true);
      try {
        await getAllCollectionNFT(principal);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [principal]);

  const mintNFT = async (
    principalStringg,
    nftname,
    nftdescription,
    nftimage,
    nftquantity,
    nftcolor,
    nftprice
  ) => {
    try {
      console.log("in mint", principalStringg);
      const principalString = principalStringg;
      const principal = Principal.fromText(principalString);
      console.log(principal);
      const date = new Date();
      // const formattedDate = `${
      //   date.getMonth() + 1
      // }-${date.getDate()}-${date.getFullYear()} ${date.getHours()}:${date
      //   .getMinutes()
      //   .toString()
      //   .padStart(2, "0")}`;
      const metadata = JSON.stringify({
        nfttype,
        standard: "EXT V2",
        chain: "ICP",
        contractAddress: canisterId,
        nftcolor,
        // date: formattedDate,
      });

      const metadataContainer = {
        json: metadata,
      };

      const result = await backendActor?.mintExtNonFungible(
        principal,
        nftname,
        nftdescription,
        "thumbnail",
        nftimage,
        metadataContainer ? [metadataContainer] : [],
        Number(nftquantity)
      );

      console.log(result, "nft mint data");
      const es8_price = parseInt(parseFloat(nftprice) * 100000000);
      console.log(es8_price, "price");
      if (result && result.length > 0) {
        result.map((val, key) => {
          getNftTokenId(principal, val[1], es8_price);
        });
      }

      // if (result) {
      //   setTokenId(result[0]);
      //   console.log("NFT Minted: ", result[0]);
      //   await getNftTokenId(answ, result[0]);
      // } else {
      //   throw new Error("Error in mintNFT");
      //   toast.error("Error in mintNFT");
      // }
    } catch (error) {
      console.error("Error minting NFT:", error);
      toast.error("Error minting NFT");
      return error; // Return error
    }
  };

  const getNftTokenId = async (principal, nftIdentifier, nftprice) => {
    try {
      console.log(principal, nftIdentifier, nftprice);
      // const principall = Principal.fromText(principal);
      const res = await listPrice(principal, nftIdentifier, nftprice);
      console.log(res, "res data");
    } catch (error) {
      console.error("Error fetching NFT token ID:", error);
      toast.error("Error in getNftTokenId");
      return error;
    }
  };

  const listPrice = async (principal, tokenidentifier, price) => {
    try {
      const finalPrice = price;

      const priceE8s = finalPrice ? finalPrice : null;

      const request = {
        token: tokenidentifier,
        from_subaccount: [],
        price: priceE8s ? [priceE8s] : [],
      };
      const result = await backendActor?.listprice(principal, request);
      if (result) {
        console.log("List Price Result:", result);
        await getListing(principal);
      } else {
        throw new Error("listprice is not working");
        toast.error("listprice is not working");
      }
    } catch (error) {
      console.error("Error listing price:", error);
      toast.error("Error listing price");
      return error; // Return error
    }
  };

  const getListing = async (principal) => {
    try {
      console.log(principal);
      const result = await backendActor?.listings(principal);
      console.log("Listing", result);
    } catch (error) {
      console.error("Error fetching listing:", error);
      toast.error("Error fetching listing");
      return error; // Return error
    }
  };

  const getAddedNftDetails = async (nftDetails) => {
    setnfttype(nftDetails.nftType);
    setnftname(nftDetails.nftName);
    setnftquantity(nftDetails.nftQuantity);
    setnftprice(nftDetails.nftPrice);
    setnftdescription(nftDetails.nftDescription);
    setnftimage(nftDetails.nftImage);
    setnftcolor(nftDetails.nftcolor);
    let hasError = false;
    console.log(principalStringg);
    setLoading(true);
    try {
      const mintResult = await mintNFT(
        principalStringg,
        nftDetails.nftName,
        nftDetails.nftDescription,
        nftDetails.nftImage,
        nftDetails.nftQuantity,
        nftDetails.nftcolor,
        nftDetails.nftPrice
      );
      console.log(mintResult);

      if (mintResult instanceof Error) {
        hasError = true;
        throw mintResult;
        toast.error(mintResult);
      } else {
        toast.success("nft added");
      }
    } catch (error) {
      console.error("Error in get added nft: ", error);
      toast.error("Error in get added nft");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="w-[90%] overflow-y-scroll pt-10 px-10 pb-8 h-screen no-scrollbar  no-scroll 2xl:ml-[7%] md:w-full lg:w-[90%] lg:pt-20">
        {loading ? (
          <div
            style={{
              display: "grid",
              lineHeight: 3,
              padding: "1rem",
              marginBottom: "0.5rem",
            }}
          >
            <Skeleton />
            <Skeleton count={5} />
          </div>
        ) : (
          <div className="w-full">
            {/* Back button and action buttons */}
            <div className="flex items-center justify-between w-full pt-9">
              <BackButton />
              <div className="flex justify-end w-full ml-auto lg:-ml-12 gap-x-6 md:ml-0 sm:ml-auto">
                <YellowButton methodName={() => toggleModal()}>
                  Add NFT
                </YellowButton>
              </div>
            </div>

            {/* Collection details section */}
            <div className="flex flex-col md:flex-row gap-x-8 items-center bg-[#414141] w-full  p-10 text-[#FFFFFF]  rounded-md my-10 justify-between">
              <img
                className="w-32 h-32"
                src={collectiondata[3]}
                alt={collectiondata[2]}
              />
              <div className="space-y-4">
                <div className="flex justify-between">
                  <h1 className="text-sm font-semibold md:text-3xl">
                    {collectiondata[2]}
                  </h1>
                </div>
                <p className="text-sm font-normal font-Quicksand md:text-xl">
                  {nftdescription}
                </p>
                <h3 className="text-sm font-bold font-Quicksand md:text-xl">
                  Collection ID - {principalStringg}
                </h3>
              </div>
            </div>

            {/* NFT list section */}
            <div className="w-full pb-12 text-white">
              <h1 className="text-2xl">
                List of all NFT Collection - {principalStringg}
              </h1>
              <div className="grid justify-between grid-cols-5 gap-5 mt-8 overflow-x-auto overflow-y-hidden sm:flex-wrap md:gap-8 xl:gap-5">
                {nftList?.map((list, index) => (
                  <>
                    <NftCard
                      id={id}
                      list={list[2]}
                      img={list[2]}
                      key={index}
                      data={list}
                    />
                  </>
                ))}
              </div>
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
          </div>
        )}
      </div>
    </SkeletonTheme>
  );
}

export default CollectionDetails;
