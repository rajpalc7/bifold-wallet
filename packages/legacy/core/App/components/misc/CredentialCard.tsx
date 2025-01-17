import { CredentialExchangeRecord } from '@credo-ts/core'
import { Attribute, BrandingOverlayType, Predicate } from '@hyperledger/aries-oca/build/legacy'
import React from 'react'
import { ViewStyle } from 'react-native'

import { useConfiguration } from '../../contexts/configuration'
import { useTheme } from '../../contexts/theme'
import { GenericFn } from '../../types/fn'

import CredentialCard10 from './CredentialCard10'
import CredentialCard11 from './CredentialCard11'

interface CredentialCardProps {
  credential?: CredentialExchangeRecord
  credDefId?: string
  schemaId?: string
  proofCredDefId?: string
  proofSchemaId?: string
  credName?: string
  onPress?: GenericFn
  style?: ViewStyle
  proof?: boolean
  displayItems?: (Attribute | Predicate)[]
  existsInWallet?: boolean
  satisfiedPredicates?: boolean
  hasAltCredentials?: boolean
  handleAltCredChange?: () => void
}

const CredentialCard: React.FC<CredentialCardProps> = ({
  credential,
  credDefId,
  schemaId,
  proofCredDefId,
  proofSchemaId,
  proof,
  displayItems,
  credName,
  existsInWallet,
  satisfiedPredicates,
  hasAltCredentials,
  handleAltCredChange,
  style = {},
  onPress = undefined,
}) => {
  // add ability to reference credential by ID, allows us to get past react hook restrictions
  const { OCABundleResolver } = useConfiguration()
  const { ColorPallet } = useTheme()
  const getCredOverlayType = (type: BrandingOverlayType) => {
    if (proof) {
      return (
        <CredentialCard11
          displayItems={displayItems}
          style={{ backgroundColor: ColorPallet.brand.secondaryBackground }}
          error={!existsInWallet}
          predicateError={!satisfiedPredicates}
          credName={credName}
          credDefId={credDefId}
          schemaId={schemaId}
          proofCredDefId={proofCredDefId}
          proofSchemaId={proofSchemaId}
          credential={credential}
          handleAltCredChange={handleAltCredChange}
          hasAltCredentials={hasAltCredentials}
          proof
          elevated
        ></CredentialCard11>
      )
    }

    if (credential) {
      if (type === BrandingOverlayType.Branding01) {
        return <CredentialCard10 credential={credential as CredentialExchangeRecord} style={style} onPress={onPress} />
      } else {
        return <CredentialCard11 credential={credential as CredentialExchangeRecord} style={style} onPress={onPress} />
      }
    } else {
      return (
        <CredentialCard11
          credDefId={credDefId}
          schemaId={schemaId}
          credName={credName}
          displayItems={displayItems}
          style={style}
          onPress={onPress}
        />
      )
    }
  }
  return getCredOverlayType(OCABundleResolver.getBrandingOverlayType())
}

export default CredentialCard
