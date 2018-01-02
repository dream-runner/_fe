// @flow
import React from 'react'
import { compose, withHandlers, withProps } from 'recompose'
import i18n from 'signavio-i18n'
import { find, keys } from 'lodash'

import { omitProps } from '@signavio/effektif-commons/lib/components'
import { Checkbox } from '@signavio/effektif-commons/lib/components/forms'
import { Tile } from '@signavio/effektif-commons/lib/components/tiles'

import {
  availableLanguages,
  LanguageSelect,
} from '../../../../packages/organizations'

type PropsT = {
  template: boolean,
  language: string,
  readOnly: boolean,
  onTemplateChange: () => void,
  onLanguageChange: () => void,
}

type ApiPropsT = {
  category: string,
  template: boolean,

  onTemplateChange: boolean => void,
  onCategoryChange: string => void,
}

const getLanguage = (languageCode: string) =>
  find(
    keys(availableLanguages()),
    (code: string) => code.indexOf(languageCode) === 0
  )

const ExampleDefinition = ({
  template,
  onTemplateChange,
  language,
  onLanguageChange,
  readOnly,
  ...rest
}: PropsT) => (
  <Tile
    {...rest}
    header={
      <Checkbox
        checked={template}
        onClick={onTemplateChange}
        disabled={readOnly}
      />
    }
  >
    <LanguageSelect
      value={language}
      placeholder={i18n('Language of this process')}
      onChange={onLanguageChange}
      readOnly={readOnly}
    />
  </Tile>
)

const enhance = compose(
  withHandlers({
    onTemplateChange: ({ template, onTemplateChange }: ApiPropsT) => () => {
      onTemplateChange(!template)
    },
    onLanguageChange: ({ onCategoryChange }: ApiPropsT) => (
      language: string
    ) => {
      // we are just interested in the language and not the country
      const languageCode = language.split('_')[0]
      onCategoryChange(`examples_${languageCode}`)
    },
  }),
  withProps(({ category }: ApiPropsT) => {
    const language = !category
      ? undefined
      : getLanguage(category.replace('examples_', ''))
    return {
      language,
    }
  }),
  omitProps(['category', 'onCategoryChange'])
)

export default enhance(ExampleDefinition)



// WEBPACK FOOTER //
// ./src/processes/views/edit/ExampleDefinition.js