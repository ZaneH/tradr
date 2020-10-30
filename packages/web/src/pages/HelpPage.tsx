import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Box, Button, Card, Flex, Heading, Link, Text } from 'rebass'
import { AddressBox, Footer } from '../components'
import Routes from '../constants/Routes'
import { useGetAddressQuery } from '../generated/types'

const HelpPage = () => {
  const { data: addressData, loading: addressLoading } = useGetAddressQuery()

  return (
    <>
      <Flex px={5} py={4} alignItems="center">
        <Heading>
          <RouterLink to={Routes.home}>
            <Link as="span" variant="nav">
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
            <Box width={1 / 2}>
              <Heading variant="h3">Automate your trades, for free!</Heading>
            </Box>
            <Box width={1 / 2} sx={{ textAlign: 'right' }}>
              <RouterLink to={Routes.home}>
                <Button variant="subtle" mx={3}>
                  Go Home
                </Button>
              </RouterLink>
              <RouterLink to={Routes.donate}>
                <Button variant="outline">Donate</Button>
              </RouterLink>
            </Box>
          </Flex>
        </Card>
      </Flex>
      <Flex px={6} py={4}>
        <Box width={[1, 3 / 4, 1 / 2]}>
          <Box mb={4}>
            <Heading variant="h2">Is this safe?</Heading>
            <Text mb={2}>For legal purposes: no.</Text>
            <Text>
              I built this bot to the best of my abilities, but that isn't
              safety.
            </Text>
          </Box>
          <Box mb={4}>
            <Heading variant="h2">How does it work?</Heading>
            <Text mb={2}>The bot is fairly simple.</Text>
            <Text>
              It watches Uniswap for trades that fit your criteria. Say you want
              to sell 32 LINK for 1 ETH. Normally you'd have to watch the market
              until that trade was possible. Tradr will run in the background
              and make the trade as soon as it can.
            </Text>
          </Box>
          <Box mb={4}>
            <Heading variant="h2">Why isn't there a website?</Heading>
            <Text mb={2}>
              For security reasons. In order for Tradr to make trades on your
              behalf, it must have direct access to your wallet (via private
              keys). I tried finding ways around this, unfortunately, it is what
              it is.
            </Text>
            <Text>
              For transparency, I open-sourced the code to allow anyone to audit
              and run the code on their own. If Tradr was hosted on a website,
              you'd have to trust the host.
            </Text>
          </Box>
          <Box mb={4}>
            <Heading variant="h2">Token requests</Heading>
            <Text>
              I'm still thinking about the best way to handle this, but
              currently tokens need to be manually added to the bot. Open a{' '}
              <a
                href="https://github.com/zaneh/tradr/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub issue
              </a>{' '}
              to request that a token be added. Tradr maintainers will manually
              review the tokens to help prevent potential misuse.
            </Text>
          </Box>
        </Box>
      </Flex>
      <Flex px={5} py={4}>
        <Box width="100%">
          <Footer />
        </Box>
      </Flex>
    </>
  )
}

export default HelpPage
