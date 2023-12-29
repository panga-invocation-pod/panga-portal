require_relative 'base_responder'

module Messaging
  module Responders
    class Form < BaseResponder
      def self.from_data(data)
        new data
      end

      def initialize(data)
        super
      end

      def responder_type
        'form'
      end
    end
  end
end