require_relative 'base_responder'

module Messaging
  module Responders
    class Option
      def self.from_data(data)
        hash = data.is_a?(Hash) ? data : { 'text' => data }

        new text: hash['text'], option_type: hash['type'], if_condition: Conditions::Factory.from_data(hash["if"])
      end

      def initialize(text:, option_type: nil, if_condition: nil)
        @text = text
        @option_type = option_type
        @if_condition = if_condition
      end

      attr_reader :text, :if_condition, :option_type

      def as_json
        {
          text: text,
          type: option_type,
      }.compact
      end

      def valid?(context)
        return true unless if_condition
        if_condition.valid?(context: context)
      end
    end

    class OptionList
      def self.from_data(data)
        new data.map { |option| Option.from_data(option) }
      end

      def initialize(options)
        @options = options
      end

      attr_reader :options

      def as_json(context = nil)
        valid_options(context).map { |option| option.as_json }
      end

      def valid_options(context)
        options.reject { |option| !option.valid?(context) }
      end
    end

    class SelectOption < BaseResponder
      def self.from_data(data)
        new options: OptionList.from_data(data['options'])
      end

      def initialize(options:)
        @options = options
      end

      attr_reader :options

      def responder_type
        'select_option'
      end

      def as_json(context)
        {
          responder_type: responder_type,
          options: options&.as_json(context),
        }
      end
    end
  end
end
