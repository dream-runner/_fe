// @flow
import React from 'react'
import i18n from 'signavio-i18n'
import { compose, withState, withHandlers } from 'recompose'
import { Link } from 'react-router-dom'

import { applicationName } from '@signavio/effektif-commons'
import { Feedback, userUtils } from '@signavio/effektif-api'
import {
  ELearningLink,
  UserMenu,
  UserGuideLink,
  Feature,
  List,
  Divider,
} from '@signavio/effektif-commons/lib/components'
import { moment } from '@signavio/effektif-commons/lib/extensions'
import { defaultStyle } from '@signavio/effektif-commons/lib/styles'
import type { UserT, OrganizationT } from '@signavio/effektif-api'

import Router from 'singleton/Router'
import Effektif from 'singleton/Effektif'

import Item from './Item'
import OrganizationsList from './OrganizationsList'
import AboutEffektif from '../AboutEffektif'

type PropsT = {
  user: UserT,
  organization: OrganizationT,
  organizations?: Array<OrganizationT>,
  about?: Object,
  showAbout: boolean,
  feedback: boolean,
  onFeedbackClick: () => void,
  onAboutClick: () => void,
  onSwitchOrganization: (newOrg: OrganizationT) => void,
}

const WorkflowUserMenu = ({
  user,
  organization = {},
  organizations,
  onLogout,
  onSwitchOrganization,
  about,
  showAbout,
  feedback,
  onFeedbackClick,
  onAboutClick,
  style,
}: PropsT) => {
  const licenseRequired = organization && organization.licenseRequired
  const isOrgAdmin = organization && organization.admin
  const recentlyReleased =
    about &&
    about.releaseNote &&
    about.releaseNote.releaseDate &&
    moment()
      .twix(about.releaseNote.releaseDate)
      .count('days') > -5

  return (
    <div>
      {feedback && (
        <Feedback page={location.pathname} onSubmit={onFeedbackClick} />
      )}
      {showAbout && (
        <AboutEffektif
          model={Effektif.about()}
          page={location.pathname}
          onClose={onAboutClick}
        />
      )}
      <UserMenu user={userUtils.name(user)} organization={organization.name}>
        <div {...style('container')}>
          <List>
            {licenseRequired && (
              <a href={Router.reverse('buy')}>
                <Item key="buy" icon="money">
                  {i18n('Purchase __applicationName__', { applicationName })}
                </Item>
              </a>
            )}

            {!licenseRequired && (
              <Link to="/profile" className="user-profile">
                <Item icon="user" className="profile">
                  {i18n('My Profile')}
                </Item>
              </Link>
            )}

            {!licenseRequired &&
              isOrgAdmin && (
                <a
                  href={Router.reverse('organization')}
                  className="hidden-xs organization-profile"
                >
                  <Item iconSet="fontAwesome" icon="building-o">
                    {i18n('Organization settings')}
                  </Item>
                </a>
              )}

            {!licenseRequired &&
              isOrgAdmin && (
                <a
                  href={Router.reverse('services')}
                  className="hidden-xs services"
                >
                  <Item icon="cog">{i18n('Services & Connectors')}</Item>
                </a>
              )}

            <Feature adminOnly showHint={false}>
              <a href={Router.reverse('admin')} className="system-admin">
                <Item icon="earth">{i18n('System Administration')}</Item>
              </a>
            </Feature>
          </List>

          <Divider />

          {organizations &&
            organizations.length > 1 && (
              <div>
                <OrganizationsList
                  organizations={organizations}
                  currentOrganizationId={organization.id}
                  onSelect={onSwitchOrganization}
                />

                <Divider />
              </div>
            )}

          <List>
            <UserGuideLink className="user-guide hidden-xs">
              <Item icon="help">{i18n('User Guide')}</Item>
            </UserGuideLink>

            <ELearningLink>
              <Item icon="graduation-cap" iconSet="fontAwesome">
                {i18n('eLearning Channel')}
              </Item>
            </ELearningLink>

            {organization.workflowCreator && (
              <Feature feature="Action.ViewExamples">
                <a href={Router.reverse('examples')}>
                  <Item icon="workflow">{i18n('Examples')}</Item>
                </a>
              </Feature>
            )}

            <Item className="feedback" icon="comment" onClick={onFeedbackClick}>
              {i18n('Send feedback')}
            </Item>

            {about && (
              <Item
                icon="map"
                onClick={onAboutClick}
                highlighted={recentlyReleased}
              >
                {i18n('About __applicationName__', { applicationName })}
              </Item>
            )}
          </List>

          <Divider />

          <Item className="logout" icon="power" onClick={onLogout}>
            {i18n('Logout')}
          </Item>
        </div>
      </UserMenu>
    </div>
  )
}

const styled = defaultStyle(({ padding }) => ({
  container: {
    width: 250,
    paddingTop: padding.small,
    paddingBottom: padding.small,
    paddingLeft: padding.small,
    paddingRight: padding.small,
  },
}))

export default compose(
  withState('feedback', 'toggleFeedback', false),
  withState('showAbout', 'toggleAbout', false),
  withHandlers({
    onFeedbackClick: ({ toggleFeedback, feedback }) => () =>
      toggleFeedback(!feedback),
    onAboutClick: ({ toggleAbout, showAbout }) => () => toggleAbout(!showAbout),
  })
)(styled(WorkflowUserMenu))



// WEBPACK FOOTER //
// ./packages/main/src/components/header/UserMenu.js