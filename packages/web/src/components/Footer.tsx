import React from 'react'
import Routes from '../constants/Routes'
import { Link as RouterLink } from 'react-router-dom'
import { Text, Link } from 'rebass'

const Footer = () => {
  return (
    <Text textAlign="center">
      <Link mx={2} href="https://twitter.com/zanehelton">
        Twitter
      </Link>
      <Link mx={2} as="span">
        <RouterLink to={Routes.donate}>Donate</RouterLink>
      </Link>
      <Link mx={2} href="https://github.com/zaneh/tradr">
        Source
      </Link>
    </Text>
  )
}

export default Footer
