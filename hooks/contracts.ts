import { useContract } from "@starknet-react/core";
import starknet_id_abi from "../abi/starknet/starknet_id_abi.json";
import naming_abi from "../abi/starknet/naming_abi.json";
import pricing_abi from "../abi/starknet/pricing_abi.json";
import verifier_abi from "../abi/starknet/verifier_abi.json";
import erc20_abi from "../abi/starknet/erc20_abi.json";
import { Abi } from "starknet";

//L2 Contracts
export const starknetIdContract: string =
  "0x0122ea781b9ee73e57e991092d88dfea17c0c4cbf335c6c70c349d98dd5d510c";

export const namingContract: string =
  "0x07bb1b694dea5f117a380ab56d2ad5c656196a14192d549b74a04a59220ab3a3";

export const pricingContract: string =
  "0x06ce507f6d3eb83bccd4a8a041a86c9f9a55eeeff10cac84bf00c3cd8a87f6ba";

export const verifierContract: string =
  "0x004107cbd7113cb1dd22cf496add384cbec7baf22a2677a0b377400430584862";

export const etherContract: string =
  "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";

// L1 Contracts
export const L1buyingContract = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

export function useStarknetIdContract() {
  return useContract({
    abi: starknet_id_abi as Abi,
    address: starknetIdContract,
  });
}

export function useNamingContract() {
  return useContract({
    abi: naming_abi as Abi,
    address: namingContract,
  });
}

export function usePricingContract() {
  return useContract({
    abi: pricing_abi as Abi,
    address: pricingContract,
  });
}

export function useVerifierIdContract() {
  return useContract({
    abi: verifier_abi as Abi,
    address: verifierContract,
  });
}

export function useEtherContract() {
  return useContract({
    abi: erc20_abi as Abi,
    address: etherContract,
  });
}
