import { Input, Select } from '@rebass/forms'
import React from 'react'
import { Field } from 'react-final-form'
import { Box, Flex } from 'rebass'
import { Maybe, Token } from '../generated/types'

interface Props {
  tokens?: Maybe<Token>[] | null
  selectId?: string
  inputId?: string
  [key: string]: any
}

const Adapted = {
  Input: ({ inputId, ...props }) => (
    <Field
      name={inputId}
      id={inputId}
      {...props}
      render={({ input, ...rest }) => <Input {...input} {...rest} />}
    />
  ),
  Select: ({ selectId, ...props }) => (
    <Field
      name={selectId}
      id={selectId}
      {...props}
      render={({ input, ...rest }) => <Select {...input} {...rest} />}
    />
  ),
}

const TokenInput = ({ tokens, selectId, inputId, ...props }: Props) => {
  return (
    <Flex alignItems="center">
      <Box width={3 / 4} mx={2}>
        <Adapted.Input
          inputId={inputId}
          type="number"
          min="0"
          step="any"
          {...props}
        />
      </Box>
      {tokens?.length && (
        <Box width={1 / 4} mx={2}>
          <Adapted.Select selectId={selectId}>
            <option key="none"></option>
            {tokens!.map((token) => (
              <option key={token?.id} value={token?.id}>
                {token?.symbol}
              </option>
            ))}
          </Adapted.Select>
        </Box>
      )}
    </Flex>
  )
}

export default TokenInput
