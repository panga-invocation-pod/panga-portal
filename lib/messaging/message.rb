require_relative 'transition_group'
require_relative 'command'
require_relative 'prompt'

module Messaging
  class Message
    def self.from_data(data)
      new data
    end

    def initialize(data)
      @id = data['id']
      @prompt = Prompt.from_data(data['prompt'])
      @responder = data['responder']
      @transitions = TransitionGroup.from_data(data['transitions'])
      @command = ::Messaging::Command.from_data(data['command'])
    end

    attr_reader :id, :responder, :transitions, :command
    attr_accessor :prompt

    def transition_for(context: nil, input:, command_result: nil)
      transitions.transition_for(context: context, input: input, command_result: command_result)
    end

    def as_json(interpolator = nil, script_defaults = {})
      results = {
        id: id,
        prompt: prompt.as_json(interpolator, script_defaults),
        responder: responder,
      }
      results
    end

    def apply_overrides(overrides)
      overrides.each do |key, value|
        send("#{key}=", value)
      end
    end

    def prompt_text
      prompt.text
    end
  end
end
