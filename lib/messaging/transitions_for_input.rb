require_relative 'transitions'
require_relative 'transitions/to_message'

module Messaging
  class TransitionsForInput
    def self.from_data(data)
      new data
    end

    def initialize(data)
      @rules = {}
      (data || {}).each do |key, value|
        @rules[key] = Transitions.from_data(value)
      end
    end

    def transition_for(context: nil, input:, command_result: nil)
      result = nil
      if command_result
        result = transition_for_error(command_result)
      else
        result = transition_for_input(input) || default_transition
      end

      if result && result.respond_to?(:transition_for)
        result = result.transition_for(context: context, input: input, command_result: command_result)
      end
      result
    end

    private

    attr_reader :rules

    def transition_for_error(command_result)
      if command_result && command_result.error_name
        rules["ERROR:#{command_result.error_name}"]
      end
    end

    def transition_for_input(input)
      return nil if input.nil?
      rules[input['text']]
    end

    def default_transition
      rules['DEFAULT']
    end
  end
end
