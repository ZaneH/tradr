import React from 'react'
import Loader from 'react-loader-spinner'
import { Box } from 'rebass'

interface Props {
  loading: boolean
}

const LoadingBlock = ({ loading }: Props) => {
  return (
    <Box px={4} py={3}>
      {loading && <Loader type="Rings" color="#000" width={44} height={44} />}
    </Box>
  )
}

export default LoadingBlock
