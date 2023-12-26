require_relative 'base_responder'

module Messaging
  module Responders
    class SelectOption < BaseResponder
      def self.from_data(data)
        new options: data['options']
      end

      def initialize(options:)
        @options = options
      end

      attr_reader :options

      def responder_type
        'select_option'
      end

      def as_json
        {
          responder_type: responder_type,
          options: options,
        }
      end
    end
  end
end
