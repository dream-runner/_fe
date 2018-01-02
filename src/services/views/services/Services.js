import React, { Component } from 'react'
import i18n from 'signavio-i18n'

import varTypeDescriptors from 'singleton/VariableTypeDescriptors'
import Effektif from 'singleton/Effektif'

import { applicationName } from '@signavio/effektif-commons'
import { HttpUtils } from '@signavio/effektif-commons/lib/utils'
import {
  UserGuideLink,
  Feature,
} from '@signavio/effektif-commons/lib/components'
import {
  Hint,
  Alert,
} from '@signavio/effektif-commons/lib/components/hints'

import TriggerDescriptorCollection from '../../collections/TriggerDescriptorCollection'

import { List } from './triggerDescriptors'

export default class Services extends Component {
  componentWillMount() {
    this.refreshServices()
  }

  componentWillUnmount() {
    const { services, triggerDescriptors } = this.state

    if (services) {
      services.off(null, null, this)
    }

    if (triggerDescriptors) {
      triggerDescriptors.off(null, null, this)
    }
  }

  render() {
    const { loading, services, triggerDescriptors, error } = this.state

    if (loading) {
      return (
        <Hint loading>
          {i18n('Loading services configuration...')}
        </Hint>
      )
    }

    const service = services.get('salesforce')

    if (!service) {
      return (
        <Hint>
          {i18n(
            'Your license does not include any external service integrations.'
          )}
        </Hint>
      )
    }

    return (
      <div className="services-view">
        {error &&
          <Alert
            title={i18n('An error occurred')}
            onDismiss={() => this.setState({ error: null })}
          >
            {error}
          </Alert>}

        <Feature feature={service.get('feature')}>
          <div className="service-group">
            <h3 className="container-header">{service.get('name')}</h3>

            <div className="row">
              <div className="col-sm-10 col-md-9 col-lg-7">
                <Hint inline>
                  {i18n(
                    'Configure a __serviceName__ integration so that changes ' +
                      'in __serviceName__ will automatically trigger __applicationName__ processes.',
                    {
                      serviceName: service.get('name'),
                      applicationName,
                    }
                  )}
                  {' '}
                  <UserGuideLink chapter="integration/salesforce">
                    {i18n('Learn more')}
                  </UserGuideLink>
                </Hint>

                <List
                  collection={triggerDescriptors}
                  onRemove={descriptor => {
                    descriptor.destroy()

                    this.refreshServices()
                  }}
                  onChange={descriptor => {
                    descriptor.once('sync', () => this.refreshServices())

                    const promise = descriptor.save()

                    if (promise) {
                      promise.fail(response => {
                        descriptor.off('sync')

                        this.setState({
                          error: response.responseJSON.message,
                        })
                      })
                    }
                  }}
                  type="salesforceMessageDescriptor"
                  service={service}
                />
              </div>
            </div>
          </div>
        </Feature>
      </div>
    )
  }

  refreshServices() {
    const services = Effektif.list('services')
    const triggerDescriptors = new TriggerDescriptorCollection()

    this.setState({
      loading: true,
    })

    const queue = HttpUtils.loadQueue()

    queue.load(services)
    queue.load(triggerDescriptors)

    queue.work(() => {
      this.setState({
        loading: false,

        services,
        triggerDescriptors,
      })
    })

    varTypeDescriptors.fetch()
  }
}



// WEBPACK FOOTER //
// ./src/services/views/services/Services.js