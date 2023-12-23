require_relative 'script'
require_relative 'interpolator'

module Messaging
  class Exchange
    def initialize(script:, context: nil, command_processor: nil)
      @script = script
      @context = context
      @interpolator = Interpolator.new(context)
      @previous_message = nil
      @input = nil
      @response_message = nil
      @command_result = nil
      @command_processor = command_processor
    end

    def user_input(to:, input:)
      @previous_message = script.find_message(to)
      @input = input
    end

    def determine_response
      target = script.transition_for context: context, input: input, command_result: command_result, previous: previous_message

      if target
        @response_message = target.get_message script
        raise "no message found to transition to with #{target.inspect}" unless @response_message

        #target.run_request_command command_processor
        target.apply_overrides @response_message
      else
        raise "no transition found for #{command_result ? command_result.error_name : input}"
      end
      @response_message
    end

    def process_response_commands
      return unless previous_message

      command = previous_message.command_for_stage("response")

      if command
        @command_result = command_processor.process_command_named command.name, input, context
      end
    end

    def as_json
      {
        message: response_message.as_json(interpolator, script_defaults),
        data: (context ? context.as_json : {})
      }
    end

    private

    attr_reader :script, :previous_message, :response_message, :input,
                :context, :interpolator, :command_result, :command_processor

    def script_defaults
      {
        character: script.character
      }
    end
  end
end
