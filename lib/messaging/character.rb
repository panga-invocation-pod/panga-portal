module Messaging
  class Character
    def self.from_data(data)
      new(
        data['id'],
        data['name']
      )
    end

    attr_reader :id, :name

    def initialize(id, name)
      @id = id
      @name = name
    end
  end
end
