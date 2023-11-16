import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import styles from "../../styles/components/profilePic.module.css";
import NftCard from "../UI/nftCard";
import ModalProfilePic from "../UI/modalProfilePic";
import {
  filterAssets,
  getWhitelistedPfpContracts,
  retrieveAssets,
} from "../../utils/nftService";
import BackButton from "../UI/backButton";
import PfpSkeleton from "./skeletons/pfpSkeleton";

type UpdateProfilePicProps = {
  identity?: Identity;
  tokenId: string;
  back: () => void;
  openTxModal: () => void;
  setPfpTxHash: (hash: string) => void;
};

const UpdateProfilePic: FunctionComponent<UpdateProfilePicProps> = ({
  tokenId,
  identity,
  back,
  openTxModal,
  setPfpTxHash,
}) => {
  const [userNft, setUserNft] = useState<StarkscanNftProps[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [selectedPic, setSelectedPic] = useState<StarkscanNftProps | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const whitelistedContracts: string[] = useMemo(() => {
    return getWhitelistedPfpContracts();
  }, []);

  useEffect(() => {
    if (!identity?.addr) return;
    retrieveAssets(
      `${process.env.NEXT_PUBLIC_SERVER_LINK}/starkscan/fetch_nfts`,
      identity.addr
    ).then((data) => {
      const filteredAssets = filterAssets(data.data, whitelistedContracts);
      setUserNft(filteredAssets);
      setIsLoading(false);
    });
  }, [tokenId, identity]);

  const selectPicture = (nft: StarkscanNftProps) => {
    setOpenModal(true);
    setSelectedPic(nft);
  };

  const goBack = (cancel: boolean) => {
    setOpenModal(false);
    if (!cancel) {
      openTxModal();
      back();
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.arrows}>
          <BackButton onClick={() => back()} />
        </div>
        <div className={styles.gallery}>
          <p className={styles.subtitle}>Your NFTs</p>
          <h2 className={styles.title}>Choose your nft identity</h2>
          <div
            className={styles.nftSection}
            onMouseLeave={() => setIsHovered(null)}
          >
            {isLoading ? (
              <PfpSkeleton />
            ) : userNft && userNft.length > 0 ? (
              userNft.map((nft, index) => {
                if (!nft.image_url) return null;
                return (
                  <div
                    key={index}
                    onMouseEnter={() => setIsHovered(nft.token_id)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    <NftCard
                      image={nft.image_url as string}
                      name={nft.name as string}
                      selectPicture={() => selectPicture(nft)}
                      isHovered={isHovered === nft.token_id}
                    />
                  </div>
                );
              })
            ) : (
              <p>You don&apos;t own any whitelisted NFTs yet. </p>
            )}
            {/* {userNft && userNft.length > 0 ? (
              userNft.map((nft, index) => {
                if (!nft.image_url) return null;
                return (
                  <NftCard
                    key={index}
                    image={nft.image_url as string}
                    name={nft.name as string}
                    selectPicture={() => selectPicture(nft)}
                  />
                );
              })
            ) : (
              <p>You don&apos;t own any whitelisted NFTs yet. </p>
            )} */}
          </div>
        </div>
      </div>
      <ModalProfilePic
        isModalOpen={openModal}
        closeModal={goBack}
        nftData={selectedPic as StarkscanNftProps}
        tokenId={tokenId}
        setPfpTxHash={setPfpTxHash}
      />
    </>
  );
};

export default UpdateProfilePic;
