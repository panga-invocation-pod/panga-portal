require 'json'
require_relative 'message_group'
require_relative 'transition_list'
require_relative 'character'

module Messaging
  class Script
    def self.from_file(file)
      from_data(JSON.parse(file.read))
    end

    def self.from_data(data)
      new(
        TransitionList.from_data(data['entries']),
        data['exits'],
        MessageGroup.from_data(data['messages']),
        Character.from_data(data['character'])
      )
    end

    attr_reader :entries, :exits, :character

    def initialize(entries, exits, messages, character = nil)
      @entries = entries
      @exits = exits
      @messages = messages
      @character = character
    end

    def find_message(id)
      messages.find_message id
    end

    def transition_for(context: nil, input:, command_result: nil, previous:)
      if previous
        previous.transition_for(context: context, input: input, command_result: command_result)
      else
        entries.transition_for(context: context, input: input, command_result: command_result)
      end
    end

    def message_for_transition(transition)
      find_message transition.target_message_id
    end

    private

    attr_reader :messages
  end
end
