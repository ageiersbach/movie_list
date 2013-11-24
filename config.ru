require 'rack'
root = Dir.pwd
use Rack::Static,
  :urls => ['/css', '/javascript'], 
  :root => "#{root}"

run Rack::File.new("#{root}/index.html")
