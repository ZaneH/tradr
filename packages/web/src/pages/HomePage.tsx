import React from 'react'
import { Form } from 'react-final-form'
import { BiPlayCircle, BiStopCircle, BiTrash } from 'react-icons/bi'
import { Link as RouterLink } from 'react-router-dom'
import { Box, Button, Card, Flex, Heading, Link, Text } from 'rebass'
import { AddressBox, TokenInput, Footer, LoadingBlock } from '../components'
import Routes from '../constants/Routes'
import {
  useCreateWatcherMutation,
  useDeleteWatcherMutation,
  useGetAddressQuery,
  useGetSupportedTokensQuery,
  useGetWatchersQuery,
  useSetActiveWatcherMutation,
} from '../generated/types'

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

  const [deleteWatcher] = useDeleteWatcherMutation({
    refetchQueries: ['GetWatchers'],
  })

  const activeWatchers = watcherData?.getWatchers?.filter(
    (watcher) => watcher?.isActive
  )

  const inactiveWatchers = watcherData?.getWatchers?.filter(
    (watcher) => !watcher?.isActive
  )

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
              <RouterLink to={Routes.help}>
                <Button variant="subtle" mx={3}>
                  Learn More
                </Button>
              </RouterLink>
              <RouterLink to={Routes.donate}>
                <Button variant="outline">Donate</Button>
              </RouterLink>
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
              <Box as="form" mx="auto" width={[1 / 1, 1 / 2, 1 / 2.5]} py={4}>
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

          {!watchersLoading && activeWatchers?.length === 0 && (
            <Text px={3} py={2}>
              No active trades to show
            </Text>
          )}

          {watchersLoading && <LoadingBlock loading={watchersLoading} />}

          {activeWatchers?.map((watcher) => {
            if (!watcher?.isActive) {
              return null
            }

            const fromToken = watcher?.fromToken
            const toToken = watcher?.toToken
            const fromAmount = watcher?.fromAmount
            const toAmount = watcher?.toAmount

            return (
              <Box
                px={[4]}
                width={[1 / 1, 1 / 2, 1 / 2.5]}
                variant="info"
                my={3}
                key={watcher.id}
              >
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

          {!watchersLoading && inactiveWatchers?.length === 0 && (
            <Text px={3} py={2}>
              No inactive trades to show
            </Text>
          )}

          {watchersLoading && <LoadingBlock loading={watchersLoading} />}

          {inactiveWatchers?.map((watcher) => {
            const fromToken = watcher?.fromToken
            const toToken = watcher?.toToken
            const fromAmount = watcher?.fromAmount
            const toAmount = watcher?.toAmount

            return (
              <Box
                width={[1 / 1, 1 / 2, 1 / 2.5]}
                variant="info"
                my={3}
                key={watcher?.id}
              >
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
                      <BiTrash
                        className="click-icon trash"
                        size={24}
                        onClick={() => {
                          if (
                            window.confirm(
                              'Are you sure you want to delete this?'
                            )
                          ) {
                            deleteWatcher({
                              variables: {
                                id: watcher!.id,
                              },
                            })
                          }
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
      <Flex px={5} py={4}>
        <Box width="100%">
          <Footer />
        </Box>
      </Flex>
    </>
  )
}

export default HomePage
