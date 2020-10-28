import { hashicon } from '@emeraldpay/hashicon'
import React from 'react'
import Loader from 'react-loader-spinner'
import { Box, Flex, Image } from 'rebass'

interface Props {
  loading: boolean
  address?: string | null
}

const AddressBox = ({ address, loading }: Props) => {
  const hexIcon = hashicon(address!)

  return (
    <Box variant="info">
      <Flex alignItems="center">
        {address && (
          <>
            <Image height="1.2em" src={hexIcon.toDataURL()} mx={2} />
            {`${address!.substring(0, 6)}...${address!.substring(
              address!.length - 4
            )}`}
          </>
        )}
        {!address && !loading && <span>No wallet connected</span>}
        {loading && (
          <Box px={4} py={0}>
            <Loader height={18} width={24} type="ThreeDots" color="#555" />
          </Box>
        )}
      </Flex>
    </Box>
  )
}

export default AddressBox
