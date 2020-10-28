import React from 'react'
import { Form } from 'react-final-form'
import { Box, Button, Card, Text, Flex, Heading } from 'rebass'
import AddressBox from '../components/AddressBox'
import TokenInput from '../components/TokenInput'
import {
  useCreateWatcherMutation,
  useGetAddressQuery,
  useGetSupportedTokensQuery,
  useGetWatchersQuery,
  useSetActiveWatcherMutation,
} from '../generated/types'
import { BiStopCircle, BiPlayCircle } from 'react-icons/bi'

const HomePage = () => {
  const { data: addressData, loading: addressLoading } = useGetAddressQuery()
  const { data: supportedTokenData } = useGetSupportedTokensQuery()
  const { data: watcherData, loading: watchersLoading } = useGetWatchersQuery()
  const [setActiveWatcher] = useSetActiveWatcherMutation({
    refetchQueries: ['GetWatchers'],
  })
  const [createWatcher] = useCreateWatcherMutation({
    refetchQueries: ['GetWatchers'],
  })

  return (
    <>
      <Flex px={5} py={4} alignItems="center">
        <Heading>Tradr</Heading>
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
          <Heading>Trade Bot</Heading>
          <Form
            onSubmit={(data) => {
              createWatcher({
                variables: {
                  fromTokenAmount: Number(data?.fromTokenAmount),
                  toTokenAmount: Number(data?.toTokenAmount),
                  fromTokenId: data?.fromTokenId,
                  toTokenId: data?.toTokenId,
                },
              })
                .then(() => {
                  console.log('Success')
                })
                .catch((e) => {
                  console.error(e)
                })
            }}
          >
            {({ handleSubmit }) => (
              <Box as="form" px="25%" py={4}>
                <TokenInput
                  inputId="fromTokenAmount"
                  selectId="fromTokenId"
                  tokens={supportedTokenData?.getSupportedTokens}
                  placeholder="I have"
                />
                <Box my={4} />
                <TokenInput
                  inputId="toTokenAmount"
                  selectId="toTokenId"
                  tokens={supportedTokenData?.getSupportedTokens}
                  placeholder="I want"
                />
                <Box my="24px" />
                <Button
                  variant="larger"
                  onClick={(e) => {
                    e.preventDefault()
                    handleSubmit()
                  }}
                >
                  Save
                </Button>
              </Box>
            )}
          </Form>
        </Box>
      </Flex>
      <Flex px={5} py={3}>
        <Box width="100%">
          <Heading>Your Active Trades</Heading>

          {watcherData?.getWatchers?.map((watcher) => {
            if (!watcher?.isActive) {
              return null
            }

            const fromToken = watcher?.fromToken
            const toToken = watcher?.toToken
            const fromAmount = watcher?.fromAmount
            const toAmount = watcher?.toAmount

            return (
              <Box width={1 / 2} variant="info" my={3}>
                <Flex>
                  <Box width={2 / 3}>
                    <b>From:</b> {fromAmount} {fromToken?.symbol}
                    <br />
                    <b>To:</b> {toAmount} {toToken?.symbol}
                  </Box>
                  <Box alignSelf="center" width={1 / 3}>
                    <Text textAlign="right">
                      <BiStopCircle
                        className="click-icon"
                        color="#FF3F00"
                        size={24}
                        onClick={() => {
                          setActiveWatcher({
                            variables: {
                              id: watcher.id,
                              active: false,
                            },
                          })
                        }}
                      />
                    </Text>
                  </Box>
                </Flex>
              </Box>
            )
          })}
        </Box>
      </Flex>
      <Flex px={5} py={3}>
        <Box width="100%">
          <Heading>Your Inactive Trades</Heading>

          {watcherData?.getWatchers?.map((watcher) => {
            if (watcher?.isActive) {
              return null
            }

            const fromToken = watcher?.fromToken
            const toToken = watcher?.toToken
            const fromAmount = watcher?.fromAmount
            const toAmount = watcher?.toAmount

            return (
              <Box width={1 / 2} variant="info" my={3}>
                <Flex>
                  <Box width={2 / 3}>
                    <b>From:</b> {fromAmount} {fromToken?.symbol}
                    <br />
                    <b>To:</b> {toAmount} {toToken?.symbol}
                  </Box>
                  <Box alignSelf="center" width={1 / 3}>
                    <Text textAlign="right">
                      <BiPlayCircle
                        className="click-icon"
                        color="#21A179"
                        size={24}
                        onClick={() => {
                          setActiveWatcher({
                            variables: {
                              id: watcher!.id,
                              active: true,
                            },
                          })
                        }}
                      />
                    </Text>
                  </Box>
                </Flex>
              </Box>
            )
          })}
        </Box>
      </Flex>
    </>
  )
}

export default HomePage
