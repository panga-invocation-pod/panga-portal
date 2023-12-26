require_relative './transitions/script_entry'

module Messaging
  class ScriptEntryGroup
    def self.from_data(data)
      entries = data.map do |entry_data|
        Transitions::ScriptEntry.from_data entry_data
      end

      new(entries)
    end

    def initialize(entries)
      @entries = entries
    end

    def transition_for(context: nil, input:, command_result: nil)
      entries.each do |entry|
        return entry if entry.valid?(context: context)
      end

      nil
    end

    private

    attr_reader :entries
  end
end
