require_relative 'base_responder'

module Messaging
  module Responders
    class Option
      def self.from_data(data)
        hash = data.is_a?(Hash) ? data : { 'text' => data }

        new text: hash['text'], if_condition: hash['if']
      end

      def initialize(text:, if_condition: nil)
        @text = text
        @if = if_condition
      end

      attr_reader :text, :if_condition

      def as_json
        text
      end
    end

    class SelectOption < BaseResponder
      def self.from_data(data)
        new options: data['options'].map { |option| Option.from_data(option) }
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
          options: options&.map { |option| option.as_json },
        }
      end
    end
  end
end
