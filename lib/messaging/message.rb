require_relative 'transitions_for_input'
require_relative 'command'
require_relative 'prompt'
require_relative 'responders'

module Messaging
  class Message
    def self.from_data(data)
      new data
    end

    def initialize(data)
      @id = data['id']
      @prompt = Prompt.from_data(data['prompt'])
      @responder = Responders::from_data(data['responder'])
      @transitions = TransitionsForInput.from_data(data['transitions'])
      @command = ::Messaging::Command.from_data(data['command'])
      @display = data.key?('display') ? data['display'] : true
    end

    attr_reader :id, :responder, :transitions, :command
    attr_accessor :prompt

    def transition_for(context: nil, input:, command_result: nil)
      transitions.transition_for(context: context, input: input, command_result: command_result)
    end

    def as_json(interpolator = nil, script_defaults = {}, context = nil)
      {
        id: id,
        prompt: prompt&.as_json(interpolator, script_defaults),
        responder: responder&.as_json(context: context, interpolator: interpolator),
      }.compact
    end

    def display?
      @display
    end

    def apply_overrides(overrides)
      overrides.each do |key, value|
        send("#{key}=", value)
      end
    end

    def prompt_text
      prompt.text
    end

    def command_for_stage(stage)
      command && command.for_stage?(stage) ? command : nil
    end
  end
end
