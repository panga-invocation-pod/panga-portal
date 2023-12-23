module Messaging
  class Command
    DEFAULT_STAGE = "response"
    VALID_STAGES = ["response", "request"]

    def self.from_data(data)
      return nil if data.nil?
      data = {"name" => data} if data.is_a?(String)

      self.new(name: data['name'], stage: data['stage'], input: data['input'])
    end

    def initialize(name:, stage: nil, input: nil)
      @name = name
      @stage = stage || DEFAULT_STAGE
      @input = input

      validate_stage(@stage)
    end

    attr_reader :name, :stage, :input

    def for_stage?(stage)
      validate_stage(stage)
      self.stage == stage
    end

    private

    def validate_stage(stage)
      raise ArgumentError, "invalid stage for command" unless VALID_STAGES.include?(stage)
    end
  end
end
