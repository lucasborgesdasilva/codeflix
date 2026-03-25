export const categoryResponse = {
  "data": [
    {
      "id": "0711af0c-7d83-442f-a1b2-54e2eb3c8295",
      "name": "Orchid",
      "description": null,
      "is_active": true,
      "deleted_at": null,
      "created_at": "2026-03-11T00:45:53+0000",
      "updated_at": "2026-03-11T00:45:53+0000"
    },
    {
      "id": "81e605b8-dfb6-4534-9633-2918b34b5b47",
      "name": "Cyan",
      "description": null,
      "is_active": true,
      "deleted_at": null,
      "created_at": "2026-03-19T00:58:07+0000",
      "updated_at": "2026-03-19T00:58:07+0000"
    },
  ],
  "links": {
    "first": "http://localhost:8000/api/categories?page=1",
    "last": "http://localhost:8000/api/categories?page=7",
    "prev": null,
    "next": "http://localhost:8000/api/categories?page=2"
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 7,
    "path": "http://localhost:8000/api/categories",
    "per_page": 15,
    "to": 15,
    "total": 100
  }
}

export const categoryResponse2 = {
  "data": [
    {
      "id": "85720833-8e16-4a44-8fe0-d1c99e5d7ec0",
      "name": "BlanchedAlmond",
      "description": "teste para página 2",
      "is_active": true,
      "deleted_at": null,
      "created_at": "2026-03-19T00:58:07+0000",
      "updated_at": "2026-03-19T00:58:07+0000"
    },
  ],
  "links": {
    "first": "http://localhost:8000/api/categories?page=1",
    "last": "http://localhost:8000/api/categories?page=7",
    "prev": "http://localhost:8000/api/categories?page=1",
    "next": "http://localhost:8000/api/categories?page=3"
  },
  "meta": {
    "current_page": 2,
    "from": 1,
    "last_page": 7,
    "path": "http://localhost:8000/api/categories",
    "per_page": 15,
    "to": 15,
    "total": 100
  }
}