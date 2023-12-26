require_relative 'responders/base_responder'
require_relative 'responders/select_option'

module Messaging
  module Responders
    def self.from_data(data)
      return nil if data.nil?

      responder_type = data['responder_type']
      responder_class = case responder_type
      when 'select_option'
        SelectOption
      else
        BaseResponder
      end

      responder_class.from_data data
    end
  end
end