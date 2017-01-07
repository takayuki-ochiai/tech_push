require 'yaml'
rails_root = Dir.pwd
namespace :yaml_books do
  task :import => :environment do
    books = YamlBooksFormatter.format_items("#{rails_root}/lib/tasks/data/book.yml")
    books.each { |book|
      book.save_with_isbn
    }
  end
end
