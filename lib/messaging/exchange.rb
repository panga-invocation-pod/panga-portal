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
      process_response_commands
    end

    def determine_response
      @response_message = determine_response_message
    end

    def as_json
      {
        message: response_message.as_json(interpolator, script_defaults, context),
        data: (context ? context.as_json : {})
      }
    end

    private

    def determine_response_message
      target = script.transition_for context: context, input: input, command_result: command_result, previous: previous_message

      if target
        response_message = target.get_message script: script, context: context, command_result: command_result
        raise "no message found to transition to with #{target.inspect}" unless response_message

        process_request_commands(response_message)
        target.apply_overrides response_message
      else
        raise "no transition found for #{command_result ? command_result.error_name : input}"
      end

      return response_message if response_message.display?

      @previous_message = response_message
      @input = nil
      @command_result = nil

      process_response_commands
      determine_response_message
    end

    attr_reader :script, :previous_message, :response_message, :input,
                :context, :interpolator, :command_result, :command_processor

    def script_defaults
      {
        character: script.character
      }
    end

    def process_response_commands
      return unless previous_message

      command = previous_message.command_for_stage("response", input: input)

      if command
        @command_result = command_processor.process_command_named command.name, input, context
      end
    end

    def process_request_commands(message)
      command = message.command_for_stage("request", input: nil)

      if command
        @command_result = command_processor.process_command_named command.name, command.input, context
      end
    end
  end
end
