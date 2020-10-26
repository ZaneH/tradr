import { hashicon } from '@emeraldpay/hashicon'
import { Input } from '@rebass/forms'
import React from 'react'
import { Box, Button, Card, Flex, Heading, Image } from 'rebass'
import { useGetAddressQuery } from '../generated/types'

const HomePage = () => {
  const { data } = useGetAddressQuery()

  const account = data?.getAddress!
  const hexIcon = hashicon(account)

  return (
    <>
      <Flex px={5} py={4} alignItems="center">
        <Heading>Tradr</Heading>
        <Box mx="auto" />
        {data?.getAddress && (
          <Box variant="info">
            <Flex alignItems="center">
              <Image height="1.2em" src={hexIcon.toDataURL()} mx={2} />
              {`${account!.substring(0, 6)}...${account!.substring(
                account!.length - 4
              )}`}
            </Flex>
          </Box>
        )}
      </Flex>
      <Flex px={5} py={2}>
        <Card width="100%">
          <Flex px={5} py={4} alignItems="center">
            <Box width={1 / 2}>
              <Heading variant="h3">Automate your trades, for free!</Heading>
            </Box>
            <Box width={1 / 2} sx={{ textAlign: 'right' }}>
              <Button variant="subtle" mx={3}>
                Learn More
              </Button>
              <Button variant="outline">Donate</Button>
            </Box>
          </Flex>
        </Card>
      </Flex>
      <Flex px={5} py={4} sx={{ textAlign: 'center' }}>
        <Box width="100%">
          <Heading>Your Pending Trades</Heading>
        </Box>
      </Flex>
      <Flex px={5} py={4} sx={{ textAlign: 'center' }}>
        <Box width="100%">
          <Heading>Trade Bot</Heading>
          <Box as="form" px="25%" py={4}>
            <Input id="token0Amount" name="token0Amount" placeholder="I have" />
            <Box my={4} />
            <Input id="token1Amount" name="token1Amount" placeholder="I want" />
            <Box my="24px" />
            <Button
              variant="larger"
              onClick={(e) => {
                e.preventDefault()
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Flex>
    </>
  )
}

export default HomePage
