using System.Collections.Concurrent;
using System.Text.Json;
using WishlistBackend.Models;

namespace WishlistBackend.Services;

public sealed class WishlistStore
{
    private readonly string _storagePath;
    private readonly ConcurrentDictionary<Guid, WishlistItem> _items;

    public WishlistStore(string storagePath)
    {
        _storagePath = storagePath;
        _items = new ConcurrentDictionary<Guid, WishlistItem>(LoadItems());
    }

    public IEnumerable<WishlistItem> GetAll() => _items.Values.OrderBy(item => item.CreatedAt);

    public WishlistItem? Add(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            return null;
        }

        var item = new WishlistItem
        {
            Name = name.Trim(),
            CreatedAt = DateTime.UtcNow
        };

        if (_items.TryAdd(item.Id, item))
        {
            Save();
            return item;
        }

        return null;
    }

    public bool Remove(Guid id)
    {
        var removed = _items.TryRemove(id, out _);
        if (removed)
        {
            Save();
        }
        return removed;
    }

    private IDictionary<Guid, WishlistItem> LoadItems()
    {
        try
        {
            if (!File.Exists(_storagePath))
            {
                return new Dictionary<Guid, WishlistItem>();
            }

            var json = File.ReadAllText(_storagePath);
            var items = JsonSerializer.Deserialize<List<WishlistItem>>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            }) ?? new List<WishlistItem>();

            return items.ToDictionary(item => item.Id);
        }
        catch
        {
            return new Dictionary<Guid, WishlistItem>();
        }
    }

    private void Save()
    {
        var items = _items.Values.OrderBy(item => item.CreatedAt).ToList();
        var json = JsonSerializer.Serialize(items, new JsonSerializerOptions { WriteIndented = true });
        File.WriteAllText(_storagePath, json);
    }
}
