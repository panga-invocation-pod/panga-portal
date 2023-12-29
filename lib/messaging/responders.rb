require_relative 'responders/base_responder'
require_relative 'responders/select_option'
require_relative 'responders/custom'
require_relative 'responders/form'

module Messaging
  module Responders
    def self.from_data(data)
      return nil if data.nil?

      responder_type = data['responder_type']
      responder_class = "Messaging::Responders::#{responder_type.camelize}".constantize

      responder_class.from_data data
    end
  end
end