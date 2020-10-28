import React from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { Link as RouterLink } from 'react-router-dom'
import { Box, Card, Flex, Heading, Link, Text } from 'rebass'
import { AddressBox } from '../components'
import Routes from '../constants/Routes'
import { useGetAddressQuery } from '../generated/types'

const DonatePage = () => {
  const { data: addressData, loading: addressLoading } = useGetAddressQuery()

  return (
    <>
      <Flex px={5} py={4} alignItems="center">
        <Heading>
          <RouterLink to={Routes.home}>
            <Link variant="nav" as="span">
              Tradr
            </Link>
          </RouterLink>
        </Heading>
        <Box mx="auto" />
        <AddressBox
          address={addressData?.getAddress}
          loading={addressLoading}
        />
      </Flex>
      <Flex px={5} py={2}>
        <Card width="100%">
          <Flex px={5} py={4} alignItems="center">
            <Box width={3 / 4}>
              <Heading variant="h3">Why not?</Heading>
              <Text py={2}>
                <code>0xA41D345cE510EE596756DfAC5BDa9173712a04f7</code>
              </Text>
            </Box>
            <Box width={1 / 4}>
              <Text textAlign="right">
                <AiFillHeart size={32} color="#FF3F00" />
              </Text>
            </Box>
          </Flex>
        </Card>
      </Flex>
    </>
  )
}

export default DonatePage
